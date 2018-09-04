'use strict';
const espurify = require('espurify');
const enhance = require('enhance-visitors');
const deepStrictEqual = require('deep-strict-equal');
const util = require('./util');

const avaImportDeclarationAst = {
	type: 'ImportDeclaration',
	specifiers: [
		{
			type: 'ImportDefaultSpecifier',
			local: {
				type: 'Identifier',
				name: 'test'
			}
		}
	],
	source: {
		type: 'Literal',
		value: 'ava'
	}
};

const avaVariableDeclaratorAst = {
	type: 'VariableDeclarator',
	id: {
		type: 'Identifier',
		name: 'test'
	},
	init: {
		type: 'CallExpression',
		callee: {
			type: 'Identifier',
			name: 'require'
		},
		arguments: [
			{
				type: 'Literal',
				value: 'ava'
			}
		]
	}
};

function isTestFunctionCall(node) {
	if (node.type === 'Identifier') {
		return node.name === 'test';
	}

	if (node.type === 'MemberExpression') {
		return isTestFunctionCall(node.object);
	}

	return false;
}

function getTestModifierNames(node) {
	return util.getTestModifiers(node).map(property => property.name);
}

module.exports = () => {
	let isTestFile = false;
	let currentTestNode = null;

	/* eslint quote-props: [2, "as-needed"] */
	const predefinedRules = {
		ImportDeclaration: node => {
			if (!isTestFile && deepStrictEqual(espurify(node), avaImportDeclarationAst)) {
				isTestFile = true;
			}
		},
		VariableDeclarator: node => {
			if (!isTestFile && deepStrictEqual(espurify(node), avaVariableDeclaratorAst)) {
				isTestFile = true;
			}
		},
		CallExpression: node => {
			if (isTestFunctionCall(node.callee)) {
				// Entering test function
				currentTestNode = node;
			}
		},
		'CallExpression:exit': node => {
			if (currentTestNode === node) {
				// Leaving test function
				currentTestNode = null;
			}
		},
		'Program:exit': () => {
			isTestFile = false;
		}
	};

	return {
		hasTestModifier: mod => getTestModifierNames(currentTestNode).indexOf(mod) >= 0,
		hasNoHookModifier: () => {
			const modifiers = getTestModifierNames(currentTestNode);
			return modifiers.indexOf('before') === -1 &&
				modifiers.indexOf('beforeEach') === -1 &&
				modifiers.indexOf('after') === -1 &&
				modifiers.indexOf('afterEach') === -1;
		},
		isInTestFile: () => isTestFile,
		isInTestNode: () => currentTestNode,
		isTestNode: node => currentTestNode === node,
		merge: customHandlers => {
			return enhance.mergeVisitors([predefinedRules, customHandlers]);
		}
	};
};
