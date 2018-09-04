'use strict';
const espurify = require('espurify');
const deepStrictEqual = require('deep-strict-equal');
const util = require('../util');

const avaVariableDeclaratorInitAst = {
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
};

function report(context, node) {
	context.report({
		node,
		message: 'AVA should be imported as `test`.'
	});
}

const create = context => ({
	ImportDeclaration: node => {
		if (node.source.value === 'ava' && node.specifiers[0].local.name !== 'test') {
			report(context, node);
		}
	},
	VariableDeclarator: node => {
		if (node.id.name !== 'test' && node.init && deepStrictEqual(espurify(node.init), avaVariableDeclaratorInitAst)) {
			report(context, node);
		}
	}
});

module.exports = {
	create,
	meta: {
		docs: {
			url: util.getDocsUrl(__filename)
		}
	}
};
