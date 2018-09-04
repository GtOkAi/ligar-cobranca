'use strict';
const visitIf = require('enhance-visitors').visitIf;
const createAvaRule = require('../create-ava-rule');
const util = require('../util');

const create = context => {
	const ava = createAvaRule();
	let nestedCount = 0;

	return ava.merge({
		CallExpression: visitIf([
			ava.isInTestFile,
			ava.isTestNode
		])(node => {
			nestedCount++;
			if (nestedCount >= 2) {
				context.report({
					node,
					message: 'Tests should not be nested'
				});
			}
		}),

		'CallExpression:exit': visitIf([
			ava.isInTestFile,
			ava.isTestNode
		])(() => {
			nestedCount--;
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
