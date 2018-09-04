'use strict';

var _lowercaseKeys = require('lowercase-keys');

var _lowercaseKeys2 = _interopRequireDefault(_lowercaseKeys);

var _objProps = require('obj-props');

var _objProps2 = _interopRequireDefault(_objProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lowerObjProps = (0, _lowercaseKeys2.default)(_objProps2.default);

/**
 * Determine if a proptery belongs to a JS type
 * @param {String} type - JS type
 * @param {String} property - name of property
 * @return {Boolean} - type has named property
 */
module.exports = function (type, property) {
  if (typeof type !== 'string' || typeof property !== 'string') {
    throw new TypeError('Expected a string');
  }

  var lowerType = type.toLowerCase();

  return !!lowerObjProps[lowerType] && lowerObjProps[lowerType].indexOf(property) > -1;
};