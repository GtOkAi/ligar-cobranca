'use strict';

module.exports = {
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
			experimentalObjectRestSpread: true
		}
	},
	env: {
		node: true,
		es6: true
	},
	rules: {
		'comma-dangle': ['error', 'never'],
		'no-await-in-loop': 'error',
		'no-compare-neg-zero': 'error',
		'no-cond-assign': 'error',
		'no-constant-condition': 'error',
		'no-control-regex': 'error',
		'no-debugger': 'error',
		'no-dupe-args': 'error',
		'no-dupe-keys': 'error',
		'no-duplicate-case': 'error',
		'no-empty-character-class': 'error',
		'no-empty': ['error', {
			allowEmptyCatch: true
		}],
		'no-ex-assign': 'error',
		'no-extra-boolean-cast': 'error',
		// Disabled because of https://github.com/eslint/eslint/issues/6028
		// 'no-extra-parens': [2, 'all', {
		// 	nestedBinaryExpressions: false,
		// 	ignoreJSX: 'multi-line'
		// }],
		'no-extra-semi': 'error',
		'no-func-assign': 'error',
		'no-inner-declarations': 'error',
		'no-invalid-regexp': 'error',
		'no-irregular-whitespace': 'error',
		'no-obj-calls': 'error',
		'no-prototype-builtins': 'error',
		'no-regex-spaces': 'error',
		'no-sparse-arrays': 'error',
		'no-template-curly-in-string': 'error',
		'no-unreachable': 'error',
		'no-unsafe-finally': 'error',
		'no-unsafe-negation': 'error',
		'use-isnan': 'error',
		'valid-typeof': ['error', {requireStringLiterals: true}],
		'no-unexpected-multiline': 'error',
		'accessor-pairs': 'error',
		'array-callback-return': 'error',
		'block-scoped-var': 'error',
		complexity: 'warn',
		curly: 'error',
		'default-case': 'error',
		'dot-notation': 'error',
		'dot-location': ['error', 'property'],
		eqeqeq: 'error',
		'guard-for-in': 'error',
		'no-alert': 'error',
		'no-caller': 'error',
		'no-case-declarations': 'error',
		'no-div-regex': 'error',
		'no-else-return': 'error',
		'no-empty-pattern': 'error',
		'no-eq-null': 'error',
		'no-eval': 'error',
		'no-extend-native': 'error',
		'no-extra-bind': 'error',
		'no-extra-label': 'error',
		'no-fallthrough': 'error',
		'no-floating-decimal': 'error',
		'no-global-assign': 'error',
		'no-implicit-coercion': 'error',
		'no-implicit-globals': 'error',
		'no-implied-eval': 'error',
		'no-iterator': 'error',
		'no-labels': 'error',
		'no-lone-blocks': 'error',
		'no-multi-spaces': 'error',
		'no-multi-str': 'error',
		'no-new-func': 'error',
		'no-new-wrappers': 'error',
		'no-new': 'error',
		'no-octal-escape': 'error',
		'no-octal': 'error',
		'no-proto': 'error',
		'no-redeclare': 'error',
		'no-return-assign': ['error', 'always'],
		'no-return-await': 'error',
		'no-script-url': 'error',
		'no-self-assign': ['error', {props: true}],
		'no-self-compare': 'error',
		'no-sequences': 'error',
		'no-throw-literal': 'error',
		'no-unmodified-loop-condition': 'error',
		'no-unused-expressions': 'error',
		'no-unused-labels': 'error',
		'no-useless-call': 'error',
		'no-useless-concat': 'error',
		'no-useless-escape': 'error',
		'no-useless-return': 'error',
		'no-void': 'error',
		'no-warning-comments': 'warn',
		'no-with': 'error',
		'prefer-promise-reject-errors': ['error', {allowEmptyReject: true}],
		radix: 'error',
		'wrap-iife': ['error', 'inside', {functionPrototypeMethods: true}],
		yoda: 'error',
		'no-delete-var': 'error',
		'no-label-var': 'error',
		'no-restricted-globals': ['error', 'event'],
		'no-shadow-restricted-names': 'error',
		'no-undef-init': 'error',
		'no-undef': ['error', {
			typeof: true
		}],
		'no-unused-vars': ['error', {
			ignoreRestSiblings: true
		}],
		'no-use-before-define': ['error', 'nofunc'],
		// Disabled because of https://github.com/eslint/eslint/issues/3420
		// 'callback-return': ['warn', ['cb', 'callback', 'next', 'done']],
		'handle-callback-err': 'warn',
		'no-mixed-requires': ['error', {
			grouping: true,
			allowCall: true
		}],
		'no-new-require': 'error',
		'no-path-concat': 'error',
		'no-restricted-imports': ['error', 'domain', 'freelist', 'smalloc', 'sys', 'colors'],
		'no-restricted-modules': ['error', 'domain', 'freelist', 'smalloc', 'sys', 'colors'],
		'array-bracket-spacing': ['error', 'never'],
		'brace-style': ['error', '1tbs', {
			allowSingleLine: false
		}],
		camelcase: ['error', {
			properties: 'always'
		}],
		'capitalized-comments': ['error', 'always', {
			// You can also ignore this rule by wrapping the first word in quotes
			ignorePattern: 'pragma|ignore',
			ignoreInlineComments: true,
			ignoreConsecutiveComments: true
		}],
		'comma-spacing': ['error', {
			before: false,
			after: true
		}],
		'comma-style': ['error', 'last'],
		'computed-property-spacing': ['error', 'never'],
		'eol-last': 'error',
		'func-call-spacing': ['error', 'never'],
		'func-name-matching': 'error',
		'func-names': ['error', 'never'],
		indent: ['error', 'tab', {
			SwitchCase: 1,
			FunctionDeclaration: {
				parameters: 1,
				body: 1
			},
			FunctionExpression: {
				parameters: 1,
				body: 1
			},
			// Disabled because of https://github.com/sindresorhus/xo/issues/197
			// CallExpression: {
			// 	arguments: 1
			// }
		}],
		'jsx-quotes': 'error',
		'key-spacing': ['error', {
			beforeColon: false,
			afterColon: true
		}],
		'keyword-spacing': 'error',
		'linebreak-style': ['error', 'unix'],
		'max-depth': 'warn',
		'max-nested-callbacks': ['warn', 4],
		'max-params': ['warn', {
			max: 4
		}],
		'max-statements-per-line': 'error',
		'new-cap': ['error', {
			newIsCap: true,
			capIsNew: true
		}],
		'new-parens': 'error',
		'no-array-constructor': 'error',
		'no-lonely-if': 'error',
		'no-mixed-operators': 'error',
		'no-mixed-spaces-and-tabs': 'error',
		'no-multi-assign': 'error',
		'no-multiple-empty-lines': ['error', {
			max: 1
		}],
		'no-negated-condition': 'error',
		'no-new-object': 'error',
		'no-restricted-syntax': ['error', 'WithStatement'],
		'no-whitespace-before-property': 'error',
		'no-trailing-spaces': 'error',
		'no-unneeded-ternary': 'error',
		'object-curly-spacing': ['error', 'never'],
		// Disabled because of https://github.com/sindresorhus/eslint-config-xo/issues/27
		// 'object-property-newline': 'error',
		'one-var': ['error', 'never'],
		'one-var-declaration-per-line': 'error',
		'operator-assignment': ['error', 'always'],
		'operator-linebreak': ['error', 'after'],
		'padded-blocks': ['error', 'never'],
		'quote-props': ['error', 'as-needed'],
		quotes: ['error', 'single', {
			allowTemplateLiterals: true
		}],
		'semi-spacing': ['error', {
			before: false,
			after: true
		}],
		semi: ['error', 'always'],
		'space-before-blocks': ['error', 'always'],
		'space-before-function-paren': ['error', {
			anonymous: 'always',
			named: 'never',
			asyncArrow: 'always'
		}],
		'space-in-parens': ['error', 'never'],
		'space-infix-ops': 'error',
		'space-unary-ops': 'error',
		'spaced-comment': ['error', 'always', {
			line: {
				exceptions: ['-']
			},
			block: {
				markers: ['!'],
				balanced: true
			}
		}],
		'template-tag-spacing': ['error', 'never'],
		'unicode-bom': ['error', 'never'],
		'arrow-parens': ['error', 'as-needed'],
		'arrow-spacing': ['error', {
			before: true,
			after: true
		}],
		'constructor-super': 'error',
		'generator-star-spacing': ['error', 'both'],
		'no-class-assign': 'error',
		'no-const-assign': 'error',
		'no-dupe-class-members': 'error',
		'no-new-symbol': 'error',
		'no-this-before-super': 'error',
		'no-useless-computed-key': 'error',
		'no-useless-constructor': 'error',
		'no-useless-rename': 'error',
		'require-yield': 'error',
		'rest-spread-spacing': ['error', 'never'],
		'symbol-description': 'error',
		'template-curly-spacing': 'error',
		'yield-star-spacing': ['error', 'both']
	}
};
