'use strict';
const espree = require('espree');
const espurify = require('espurify');
const visitIf = require('enhance-visitors').visitIf;
const deepStrictEqual = require('deep-strict-equal');
const util = require('../util');
const createAvaRule = require('../create-ava-rule');

const booleanBinaryOperators = [
	'==',
	'===',
	'!=',
	'!==',
	'<',
	'<=',
	'>',
	'>='
];

const knownBooleanSignatures = [
	'isFinite()',
	'isNaN()',
	'Object.is()',
	'Object.isExtensible()',
	'Object.isFrozen()',
	'Object.isSealed()',
	'Boolean()',
	'Number.isNaN()',
	'Number.isFinite()',
	'Number.isInteger()',
	'Number.isSafeInteger()',
	'Array.isArray()',
	'ArrayBuffer.isView()',
	'SharedArrayBuffer.isView()',
	'Reflect.has()',
	'Reflect.isExtensible()'
].map(signature => espurify(espree.parse(signature).body[0].expression.callee));

function matchesKnownBooleanExpression(arg) {
	if (arg.type !== 'CallExpression') {
		return false;
	}

	const callee = espurify(arg.callee);

	return knownBooleanSignatures.some(signature => deepStrictEqual(callee, signature));
}

const create = context => {
	const ava = createAvaRule();

	return ava.merge({
		CallExpression: visitIf([
			ava.isInTestFile,
			ava.isInTestNode
		])(node => {
			if (
				node.callee.type === 'MemberExpression' &&
				(node.callee.property.name === 'truthy' || node.callee.property.name === 'falsy') &&
				util.nameOfRootObject(node.callee) === 't'
			) {
				const arg = node.arguments[0];

				if (arg &&
					((arg.type === 'BinaryExpression' && booleanBinaryOperators.indexOf(arg.operator) !== -1) ||
					(arg.type === 'UnaryExpression' && arg.operator === '!') ||
					(arg.type === 'Literal' && arg.value === Boolean(arg.value)) ||
					(matchesKnownBooleanExpression(arg)))
				) {
					if (node.callee.property.name === 'falsy') {
						context.report({
							node,
							message: '`t.false()` should be used instead of `t.falsy()`.'
						});
					} else {
						context.report({
							node,
							message: '`t.true()` should be used instead of `t.truthy()`.'
						});
					}
				}
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
