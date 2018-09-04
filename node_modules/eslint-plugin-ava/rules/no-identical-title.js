'use strict';
const espurify = require('espurify');
const visitIf = require('enhance-visitors').visitIf;
const deepStrictEqual = require('deep-strict-equal');
const util = require('../util');
const createAvaRule = require('../create-ava-rule');

const purify = node => node && espurify(node);

let isStatic = null;

const isStaticTemplateLiteral = node => node.expressions.every(isStatic);

isStatic = node => node.type === 'Literal' ||
		(node.type === 'TemplateLiteral' && isStaticTemplateLiteral(node)) ||
		(node.type === 'BinaryExpression' && isStatic(node.left) && isStatic(node.right));

function isTitleUsed(usedTitleNodes, titleNode) {
	const purifiedNode = purify(titleNode);
	return usedTitleNodes.some(usedTitle => deepStrictEqual(purifiedNode, usedTitle));
}

const create = context => {
	const ava = createAvaRule();
	let usedTitleNodes = [];

	return ava.merge({
		CallExpression: visitIf([
			ava.isInTestFile,
			ava.isTestNode,
			ava.hasNoHookModifier
		])(node => {
			const args = node.arguments;
			const titleNode = args.length > 1 || ava.hasTestModifier('todo') ? args[0] : undefined;

			// Don't flag computed titles or anonymous tests (anon tests covered in the if-multiple rule)
			if (titleNode === undefined || !isStatic(titleNode)) {
				return;
			}

			// Don't flag what look to be macros
			if (args.length > 2 && !util.isFunctionExpression(args[1])) {
				return;
			}

			if (isTitleUsed(usedTitleNodes, titleNode)) {
				context.report({
					node: titleNode,
					message: 'Test title is used multiple times in the same file.'
				});
				return;
			}

			usedTitleNodes.push(purify(titleNode));
		}),
		'Program:exit': () => {
			usedTitleNodes = [];
		}
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
