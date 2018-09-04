'use strict';
const visitIf = require('enhance-visitors').visitIf;
const createAvaRule = require('../create-ava-rule');
const util = require('../util');

const create = context => {
	const ava = createAvaRule();
	let endCalled = false;

	return ava.merge({
		MemberExpression: visitIf([
			ava.isInTestFile,
			ava.isInTestNode
		])(node => {
			if (ava.hasTestModifier('cb') &&
				node.object.name === 't' &&
				node.property.name === 'end'
			) {
				endCalled = true;
			}
		}),
		'CallExpression:exit': visitIf([
			ava.isInTestFile,
			ava.isTestNode
		])(node => {
			if (!ava.hasTestModifier('cb')) {
				return;
			}

			// Leaving test function
			if (endCalled) {
				endCalled = false;
			} else {
				context.report({
					node,
					message: 'Callback test was not ended. Make sure to explicitly end the test with `t.end()`.'
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
