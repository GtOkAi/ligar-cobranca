'use strict';
const visitIf = require('enhance-visitors').visitIf;
const createAvaRule = require('../create-ava-rule');
const util = require('../util');

const create = context => {
	const ava = createAvaRule();
	let asyncTest = null;
	let testUsed = false;

	const registerUseOfAwait = () => {
		if (asyncTest) {
			testUsed = true;
		}
	};

	const isAsync = node => Boolean(node && node.async);

	return ava.merge({
		CallExpression: visitIf([
			ava.isInTestFile,
			ava.isTestNode
		])(node => {
			asyncTest = (isAsync(node.arguments[0]) && node.arguments[0]) ||
				(isAsync(node.arguments[1]) && node.arguments[1]) ||
				null;
		}),
		AwaitExpression: registerUseOfAwait,
		YieldExpression: registerUseOfAwait,
		'CallExpression:exit': visitIf([
			ava.isInTestFile,
			ava.isTestNode
		])(() => {
			if (asyncTest && !testUsed) {
				context.report({
					node: asyncTest,
					loc: {
						start: asyncTest.loc.start,
						end: asyncTest.loc.start + 5
					},
					message: 'Function was declared as `async` but doesn\'t use `await`'
				});
			}
			asyncTest = null;
			testUsed = false;
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
