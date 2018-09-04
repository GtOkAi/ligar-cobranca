'use strict';
module.exports = Buffer.compare || function (a, b) {
	if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
		throw new TypeError('Arguments must be Buffers');
	}

	if (a === b) {
		return 0;
	}

	var x = a.length;
	var y = b.length;
	var len = Math.min(x, y);

	for (var i = 0; i < len; i++) {
		if (a[i] !== b[i]) {
			break;
		}
	}

	if (i !== len) {
		x = a[i];
		y = b[i];
	}

	return x < y ? -1 : y < x ? 1 : 0;
};
