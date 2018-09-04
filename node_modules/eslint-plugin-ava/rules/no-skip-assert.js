'use strict';
const visitIf = require('enhance-visitors').visitIf;
const util = require('../util');
const createAvaRule = require('../create-ava-rule');

const create = context => {
	const ava = createAvaRule();

	return ava.merge({
		MemberExpression: visitIf([
			ava.isInTestFile,
			ava.isInTestNode
		])(node => {
			if (node.property.name === 'skip' &&
					util.nameOfRootObject(node) === 't') {
				context.report({
					node,
					message: 'No assertions should be skipped.'
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
