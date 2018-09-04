'use strict';
const path = require('path');
const writeJsonFile = require('write-json-file');
const sortKeys = require('sort-keys');

const opts = {indent: 2};

const dependencyKeys = new Set([
	'dependencies',
	'devDependencies',
	'optionalDependencies',
	'peerDependencies'
]);

function normalize(pkg) {
	const ret = {};

	for (const key of Object.keys(pkg)) {
		ret[key] = dependencyKeys.has(key) ? sortKeys(pkg[key]) : pkg[key];
	}

	return ret;
}

module.exports = (fp, data) => {
	if (typeof fp !== 'string') {
		data = fp;
		fp = '.';
	}

	fp = path.basename(fp) === 'package.json' ? fp : path.join(fp, 'package.json');

	data = normalize(data);

	return writeJsonFile(fp, data, opts);
};

module.exports.sync = (fp, data) => {
	if (typeof fp !== 'string') {
		data = fp;
		fp = '.';
	}

	fp = path.basename(fp) === 'package.json' ? fp : path.join(fp, 'package.json');

	data = normalize(data);

	writeJsonFile.sync(fp, data, opts);
};
