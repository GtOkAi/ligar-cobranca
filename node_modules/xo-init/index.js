'use strict';
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const arrify = require('arrify');
const argv = require('the-argv');
const pathExists = require('path-exists');
const readPkgUp = require('read-pkg-up');
const writePkg = require('write-pkg');
const execa = require('execa');

const DEFAULT_TEST_SCRIPT = 'echo "Error: no test specified" && exit 1';

const PLURAL_OPTIONS = [
	'env',
	'global',
	'ignore'
];

const CONFIG_FILES = [
	'.eslintrc.js',
	'.eslintrc.yaml',
	'.eslintrc.yml',
	'.eslintrc.json',
	'.eslintrc',
	'.jshintrc',
	'.jscsrc',
	'.jscs.json',
	'.jscs.yaml'
];

function warnConfigFile(pkgCwd) {
	const files = CONFIG_FILES.filter(x => pathExists.sync(path.join(pkgCwd, x)));

	if (files.length === 0) {
		return;
	}

	console.log(`${files.join(' & ')} can probably be deleted now that you're using XO.`);
}

const hasYarn = pkgCwd => pathExists.sync(path.join(pkgCwd, 'yarn.lock'));

module.exports = opts => {
	opts = opts || {};

	const ret = readPkgUp.sync({
		cwd: opts.cwd,
		normalize: false
	});
	const pkg = ret.pkg || {};
	const pkgPath = ret.path || path.resolve(opts.cwd || '', 'package.json');
	const pkgCwd = path.dirname(pkgPath);
	const s = pkg.scripts = pkg.scripts ? pkg.scripts : {};

	if (s.test && s.test !== DEFAULT_TEST_SCRIPT) {
		// don't add if it's already there
		if (!/^xo( |$)/.test(s.test)) {
			s.test = `xo && ${s.test}`;
		}
	} else {
		s.test = 'xo';
	}

	const cli = minimist(opts.args || argv());
	const unicorn = cli.unicorn;

	delete cli._;
	delete cli.unicorn;
	delete cli.init;

	PLURAL_OPTIONS.forEach(option => {
		if (cli[option]) {
			cli[option + 's'] = arrify(cli[option]);
			delete cli[option];
		}
	});

	if (Object.keys(cli).length > 0) {
		pkg.xo = cli;
	} else if (pkg.xo) {
		delete pkg.xo;
	}

	writePkg.sync(pkgPath, pkg);

	const post = () => {
		warnConfigFile(pkgCwd);

		// for personal use
		if (unicorn) {
			const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
			pkg.devDependencies.xo = '*';
			writePkg.sync(pkgPath, pkg);

			CONFIG_FILES.forEach(x => {
				try {
					fs.unlinkSync(path.join(pkgCwd, x));
				} catch (err) {}
			});
		}
	};

	if (opts.skipInstall) {
		return Promise.resolve(post);
	}

	if (hasYarn(pkgCwd)) {
		return execa('yarn', ['add', '--dev', 'xo'], {cwd: pkgCwd}).then(post);
	}

	return execa('npm', ['install', '--save-dev', 'xo'], {cwd: pkgCwd}).then(post);
};
