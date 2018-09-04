# enhance-visitors [![Build Status](https://travis-ci.org/jfmengels/enhance-visitors.svg?branch=master)](https://travis-ci.org/jfmengels/enhance-visitors) [![Coverage Status](https://coveralls.io/repos/github/jfmengels/enhance-visitors/badge.svg?branch=master)](https://coveralls.io/github/jfmengels/enhance-visitors?branch=master)

> Enhance your ESLint visitors with shared logic.

## Install

```
$ npm install --save enhance-visitors
```


## Purpose

The purpose of this tool is to simplify the writing of rules with common logic. Extract the common logic into a separate file, and then write rules to build on top.


### Traversal order

For the enhancer, the traversal is done just as usual, one node at a time. The traversal is not done all at once for the enhancer, and then all at once for the rule implementation.
Rather, it's done one Node at a time, first for the enhancer (or rather, whatever you put first )
but rather the

## API

### .mergeVisitors([visitors])

Merges multiple visitor objects, so that all visitors for a node type are ran one after the other, in first-to-last order. For `<type>:exit` visitors, they are traversed last-to-first.

#### visitors: `object[]`

An array of visitor objects, such as `{CallExpression: fn1, Identifier: fn2, ...}`.

#### Example

```js
const enhance = require('enhance-visitors');

function log(message) {
  return function() {
    console.log(message);
  };
}

module.exports = function(context) {
  return enhance.mergeVisitors([
    {
      'CallExpression': log('1 - CallExpression entry'),
      'CallExpression:exit': log('1 - CallExpression exit')
    },
    {
      'CallExpression': log('2 - CallExpression entry'),
      'CallExpression:exit': log('2 - CallExpression exit')
    }
  ]);
}
```

Given the following code: `foo()`, it should print
```
1 - CallExpression entry
2 - CallExpression entry
2 - CallExpression exit
1 - CallExpression exit
```


#### Usage example: Detection of a package import

Let's say you have a npm package called `unicorn`, and that you are writing an ESLint plugin for it, so that users use it as intended and avoid pitfalls. You will write multiple rules for it, and most or all of them will need to know which variable references `unicorn`.

```js
import uni from 'unicorn'; // <-- The variable `uni` references my package
```

In order not to have to write the same detection logic in every one of your rules, let's write an enhancer. In this example, we will write it in `<root>/rules/core/unicornSeeker.js`. We'll keep it simple and only detect an import using the `import` keyword and not using `require`, and then only with the `ImportDefaultSpecifier` syntax.

```js
module.exports = function enhance(imports) {
  return {
    ImportDeclaration: function (node) {
      if (node.source.value === 'unicorn') {
        node.specifiers.forEach(function (specifier) {
          if (specifier.type === 'ImportDefaultSpecifier') {
            imports.unicorn = specifier.local.name;
          }
        });
      }
    }
  };
};
```

This visitors object will be traversed along and before your rule implementation. What it does is traverse your AST, find `ImportDeclaration` nodes, and store relevant information in `imports`.
Then in your rule file (`<root>/rules/no-unknown-methods.js`, which detects methods that do not exist in the package), we'll have:

```js
const enhance = require('enhance-visitors');
const unicornSeeker = require('./core/unicornSeeker');

const existingMethods = [
  'makeRainbow', 'trample', 'flyWithGrace'
];

module.exports = function (context) {
  const imports = {};

  return enhance.mergeVisitors([ // Noteworthy line 1
    unicornSeekerEnhancer(imports), // Noteworthy line 2
    {
      CallExpression: function (node) {
        const callee = node.callee;
        if (callee.type === 'MemberExpression' &&
          callee.object.type === 'Identifier' &&
          callee.object.name === imports.unicorn && // Noteworthy line 3
          callee.property.type === 'Identifier' &&
          existingMethods.indexOf(callee.property.name) === -1
        ) {
          context.report({
            node: node,
            message: 'Unknown `unicorn` method ' + callee.property.name
          });
        }
      }
    }
  ]);
};
```

It looks pretty much like a normal rule implementation, but there are a few differences.
In `Noteworthy line 1 & 2`, we are merging the `unicornSeeker` enhancer we wrote earlier with the rule implementation. This will make `unicornSeeker` traverse the AST and collect information that we can then use like we did in `Noteworthy line 3`.

### .visitIf([predicates])

Returns a function `fn` that takes a visitor function `visitor`. When `fn` is called (usually an AST node), `visitor` will get called with the same argument only if all predicates, also called with the same argument, return a truthy value.

This essentially allows writing less and/or shorter reusable conditions inside your visitor.

#### predicates: `function[]`

An array of predicate functions, that take a AST node as argument and return a boolean.

#### Example

```js
const enhance = require('enhance-visitors');

function isRequireCall(node) {
  return node &&
    node.callee &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'require' &&
    node.arguments.length === 1 &&
    node.arguments[0].type === 'Literal';
}

module.exports = function(context) {
  return {
    CallExpression: enhance.visitIf([isRequireCall])(node => {
      if (node.arguments[0] !== 'unicorn') {
        context.report({
          node,
          message: 'You only need to use `unicorn`'
        })
      }
    })
  };
}
```

## License

MIT © [Jeroen Engels](https://github.com/jfmengels)
