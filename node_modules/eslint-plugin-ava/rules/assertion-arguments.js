'use strict';
const visitIf = require('enhance-visitors').visitIf;
const util = require('../util');
const createAvaRule = require('../create-ava-rule');

const expectedNbArguments = {
	deepEqual: {
		min: 2,
		max: 3
	},
	fail: {
		min: 0,
		max: 1
	},
	false: {
		min: 1,
		max: 2
	},
	falsy: {
		min: 1,
		max: 2
	},
	ifError: {
		min: 1,
		max: 2
	},
	is: {
		min: 2,
		max: 3
	},
	not: {
		min: 2,
		max: 3
	},
	notDeepEqual: {
		min: 2,
		max: 3
	},
	notThrows: {
		min: 1,
		max: 2
	},
	pass: {
		min: 0,
		max: 1
	},
	plan: {
		min: 1,
		max: 1
	},
	regex: {
		min: 2,
		max: 3
	},
	notRegex: {
		min: 2,
		max: 3
	},
	snapshot: {
		min: 1,
		max: 2
	},
	throws: {
		min: 1,
		max: 3
	},
	true: {
		min: 1,
		max: 2
	},
	truthy: {
		min: 1,
		max: 2
	}
};

const create = context => {
	const ava = createAvaRule();
	const options = context.options[0] || {};
	const enforcesMessage = Boolean(options.message);
	const shouldHaveMessage = options.message !== 'never';

	function report(node, message) {
		context.report({node, message});
	}

	return ava.merge({
		CallExpression: visitIf([
			ava.isInTestFile,
			ava.isInTestNode
		])(node => {
			const callee = node.callee;

			if (callee.type !== 'MemberExpression' ||
				!callee.property ||
				util.nameOfRootObject(callee) !== 't' ||
				util.isInContext(callee)
			) {
				return;
			}

			const gottenArgs = node.arguments.length;
			const members = util.getMembers(callee)
				.filter(name => name !== 'skip');

			if (members[0] === 'end') {
				if (gottenArgs > 1) {
					report(node, `Too many arguments. Expected at most 1.`);
				}

				return;
			}

			const nArgs = expectedNbArguments[members[0]];

			if (!nArgs) {
				return;
			}

			if (gottenArgs < nArgs.min) {
				report(node, `Not enough arguments. Expected at least ${nArgs.min}.`);
			} else if (node.arguments.length > nArgs.max) {
				report(node, `Too many arguments. Expected at most ${nArgs.max}.`);
			} else if (enforcesMessage && nArgs.min !== nArgs.max) {
				const hasMessage = gottenArgs === nArgs.max;

				if (!hasMessage && shouldHaveMessage) {
					report(node, 'Expected an assertion message, but found none.');
				} else if (hasMessage && !shouldHaveMessage) {
					report(node, 'Expected no assertion message, but found one.');
				}
			}
		})
	});
};

const schema = [{
	type: 'object',
	properties: {
		message: {
			enum: [
				'always',
				'never'
			]
		}
	}
}];

module.exports = {
	create,
	meta: {
		docs: {
			url: util.getDocsUrl(__filename)
		},
		schema
	}
};
