'use strict';

var _jsTypes = require('js-types');

var _jsTypes2 = _interopRequireDefault(_jsTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Determine if a type is JS type
 * @param {String} type - type to verify
 * @return {Boolean} - type is a JS type
 */
module.exports = function isJsType(type) {
  if (typeof type !== 'string') {
    throw new TypeError('Expected type to be a string');
  }

  return _jsTypes2.default.indexOf(type) > -1;
};