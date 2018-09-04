# eslint-config-xo [![Build Status](https://travis-ci.org/sindresorhus/eslint-config-xo.svg?branch=master)](https://travis-ci.org/sindresorhus/eslint-config-xo)

> ESLint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html) for [XO](https://github.com/sindresorhus/xo)

This is for advanced users. [You probably want to use XO directly.](#use-the-xo-cli-instead)

See [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) for some additional useful rules.


## Install

```
$ npm install --save-dev eslint-config-xo
```


## Usage

Add some ESLint config to your `package.json`:

```json
{
	"name": "my-awesome-project",
	"eslintConfig": {
		"extends": "xo"
	}
}
```

Or to `.eslintrc`:

```json
{
	"extends": "xo"
}
```

Supports parsing ES2015+, but doesn't enforce it by default.

This package also exposes [`xo/esnext`](esnext.js) if you want ES2015+ rules:

```json
{
	"extends": "xo/esnext"
}
```

And [`xo/browser`](browser.js) if you're in the browser:

```json
{
	"extends": "xo/browser"
}
```


## Use the XO CLI instead

XO is an ESLint wrapper with great defaults.

Here are some reason why you should use the [XO CLI](https://github.com/sindresorhus/xo) instead of this config:

- XO comes bundled with this config.
- [Beautiful output.](https://github.com/sindresorhus/eslint-formatter-pretty)
- Bundles many useful plugins, like [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn), [`eslint-plugin-import`](https://github.com/benmosher/eslint-plugin-import), [`eslint-plugin-ava`](https://github.com/avajs/eslint-plugin-ava), and more.
- No need to specify file paths to lint. It will lint all JS files except [commonly ignored paths](https://github.com/sindresorhus/xo#ignores).
- Super simple to add XO to a project: `$ xo --init`
- Specify `indent` and `semicolon` preferences easily without messing with the rule config.
- Config/rule overrides per files/globs. *(ESLint still doesn't support this)*
- Can open all files with errors at the correct line in your editor. *(See the `--open` flag)*
- The [editor plugins](https://github.com/sindresorhus/xo#editor-plugins) are IMHO better than the ESLint ones. *(Subjective)*

tl;dr You miss out on a lot by just using this config.


## Related

- [eslint-config-xo-space](https://github.com/sindresorhus/eslint-config-xo-space) - ESLint shareable config for XO with 2-space indent
- [eslint-config-xo-react](https://github.com/sindresorhus/eslint-config-xo-react) - ESLint shareable config for React to be used with this config


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
