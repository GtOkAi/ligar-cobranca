'use strict';
const createAvaRule = require('../create-ava-rule');
const util = require('../util');

// This rule makes heavy use of eslints code path analysis
// See: http://eslint.org/docs/developer-guide/code-path-analysis.html

// returns true if this node represents a call to `t.end(...)`
const isEndExpression = node =>
	node.type === 'CallExpression' &&
	node.callee.type === 'MemberExpression' &&
	node.callee.object.type === 'Identifier' &&
	node.callee.object.name === 't' &&
	node.callee.property.type === 'Identifier' &&
	node.callee.property.name === 'end';

const create = context => {
	const ava = createAvaRule();
	const segmentInfoMap = Object.create(null);
	const segmentInfoStack = [];
	let currentSegmentInfo = null;

	function segmentStart(segment) {
		// A new CodePathSegment has started, create an "info" object to track this segments state.
		segmentInfoStack.push(currentSegmentInfo);

		currentSegmentInfo = {
			ended: false,
			prev: segment.prevSegments.map(prevSegment => segmentInfoMap[prevSegment.id])
		};

		segmentInfoMap[segment.id] = currentSegmentInfo;
	}

	function segmentEnd() {
		currentSegmentInfo = segmentInfoStack.pop();
	}

	function checkForEndExpression(node) {
		if (isEndExpression(node)) {
			currentSegmentInfo.ended = true;
		}
	}

	function checkStatement(node) {
		if (!ava.isInTestFile()) {
			return;
		}

		const ended = [currentSegmentInfo]
			.concat(currentSegmentInfo.prev)
			.filter(info => info.ended);

		// If this segment or any previous segment is already ended, further statements are not allowed, report as an error.
		if (ended.length > 0) {
			ended.forEach(info => {
				// Unset ended state to avoid generating lots of errors
				info.ended = false;
			});

			context.report({
				node,
				message: 'No statements following a call to `t.end()`.'
			});
		}
	}

	return ava.merge({
		ExpressionStatement: checkStatement,
		WithStatement: checkStatement,
		IfStatement: checkStatement,
		SwitchStatement: checkStatement,
		ThrowStatement: checkStatement,
		TryStatement: checkStatement,
		WhileStatement: checkStatement,
		DoWhileStatement: checkStatement,
		ForStatement: checkStatement,
		ForInStatement: checkStatement,
		ForOfStatement: checkStatement,
		ReturnStatement: node => {
			// Empty return statements are OK even after `t.end`,
			// only check it if there is an argument
			if (node.argument) {
				checkStatement(node);
			}
		},
		onCodePathSegmentStart: segmentStart,
		onCodePathSegmentEnd: segmentEnd,
		CallExpression: checkForEndExpression
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
