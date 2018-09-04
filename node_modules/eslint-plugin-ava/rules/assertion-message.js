'use strict';
const visitIf = require('enhance-visitors').visitIf;
const util = require('../util');
const createAvaRule = require('../create-ava-rule');

function nbArguments(node) {
	const nArgs = util.assertionMethodsNumArguments.get(node.property.name);

	if (nArgs !== undefined) {
		return nArgs;
	}

	if (node.object.type === 'MemberExpression') {
		return nbArguments(node.object);
	}

	return -1;
}

const create = context => {
	const ava = createAvaRule();
	const shouldHaveMessage = context.options[0] !== 'never';

	return ava.merge({
		CallExpression: visitIf([
			ava.isInTestFile,
			ava.isInTestNode
		])(node => {
			const callee = node.callee;

			if (callee.type !== 'MemberExpression') {
				return;
			}

			if (callee.property && util.nameOfRootObject(callee) === 't') {
				const nArgs = nbArguments(callee);

				if (nArgs === -1) {
					return;
				}

				const hasMessage = nArgs < node.arguments.length;

				if (!hasMessage && shouldHaveMessage) {
					context.report({
						node,
						message: '(DEPRECATED) Expected an assertion message, but found none.'
					});
				} else if (hasMessage && !shouldHaveMessage) {
					context.report({
						node,
						message: '(DEPRECATED) Expected no assertion message, but found one.'
					});
				}
			}
		})
	});
};

const schema = [{
	enum: [
		'always',
		'never'
	]
}];

module.exports = {
	create,
	meta: {
		docs: {
			url: util.getDocsUrl(__filename, '4211212daf1bfcfff3ebc5d4efdc4ba1a87acbf1')
		},
		schema,
		deprecated: true
	}
};
