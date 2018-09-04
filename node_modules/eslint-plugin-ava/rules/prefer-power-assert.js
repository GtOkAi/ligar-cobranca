'use strict';
const espurify = require('espurify');
const visitIf = require('enhance-visitors').visitIf;
const deepStrictEqual = require('deep-strict-equal');
const createAvaRule = require('../create-ava-rule');
const util = require('../util');

const notAllowed = [
	'truthy',
	'falsy',
	'false',
	'is',
	'not',
	'regex',
	'notRegex',
	'ifError'
];

const assertionCalleeAst = methodName => ({
	type: 'MemberExpression',
	object: {
		type: 'Identifier',
		name: 't'
	},
	property: {
		type: 'Identifier',
		name: methodName
	},
	computed: false
});

const skippedAssertionCalleeAst = methodName => ({
	type: 'MemberExpression',
	object: {
		type: 'MemberExpression',
		object: {
			type: 'Identifier',
			name: 't'
		},
		property: {
			type: 'Identifier',
			name: 'skip'
		},
		computed: false
	},
	property: {
		type: 'Identifier',
		name: methodName
	},
	computed: false
});

const isCalleeMatched = (callee, methodName) =>
	deepStrictEqual(callee, assertionCalleeAst(methodName)) ||
	deepStrictEqual(callee, skippedAssertionCalleeAst(methodName));

const create = context => {
	const ava = createAvaRule();

	return ava.merge({
		CallExpression: visitIf([
			ava.isInTestFile,
			ava.isInTestNode
		])(node => {
			const callee = espurify(node.callee);

			if (callee.type === 'MemberExpression') {
				notAllowed.forEach(methodName => {
					if (isCalleeMatched(callee, methodName)) {
						context.report({
							node,
							message: 'Only asserts with no power-assert alternative are allowed.'
						});
					}
				});
			}
		})
	});
};

module.exports = {
	create,
	meta: {
		docs: {
			url: util.getDocsUrl(__filename)
		}
	}
};
