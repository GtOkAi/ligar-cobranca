'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _isGetSetProp = require('is-get-set-prop');

var _isGetSetProp2 = _interopRequireDefault(_isGetSetProp);

var _isJsType = require('is-js-type');

var _isJsType2 = _interopRequireDefault(_isJsType);

var _isObjProp = require('is-obj-prop');

var _isObjProp2 = _interopRequireDefault(_isObjProp);

var _isProtoProp = require('is-proto-prop');

var _isProtoProp2 = _interopRequireDefault(_isProtoProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Return type of value of left or right
 * @param {Object} o - left or right of node.object
 * @return {String} - type of o
 */
var getType = function getType(o) {
  var type = _typeof(o.value);

  if (o.regex) {
    return 'RegExp';
  }

  return type.charAt(0).toUpperCase() + type.slice(1);
};

/**
  * Returns type of binary expression result
  * @param {Object} o - node's object with a BinaryExpression type
  * @return {String} - type of value produced
  */
var binaryExpressionProduces = function binaryExpressionProduces(o) {
  var leftType = o.left.type === 'BinaryExpression' ? binaryExpressionProduces(o.left) : getType(o.left),
      rightType = o.right.type === 'BinaryExpression' ? binaryExpressionProduces(o.right) : getType(o.right);

  if (leftType === 'String' || rightType === 'String' || leftType === rightType && leftType === 'RegExp') {
    return 'String';
  }

  if (leftType === rightType) {
    return leftType;
  }

  return 'Unknown';
};

/**
 * Returns the JS type and property name
 * @param {Object} node - node to examine
 * @return {Object} - jsType and propertyName
 */
var getJsTypeAndPropertyName = function getJsTypeAndPropertyName(node) {
  var propertyName = void 0,
      jsType = void 0;

  if (node.object.type === 'NewExpression') {
    jsType = node.object.callee.name;
  } else if (node.object.type === 'Literal') {
    jsType = getType(node.object);
  } else if (node.object.type === 'BinaryExpression') {
    jsType = binaryExpressionProduces(node.object);
  } else if (node.object.type === 'Identifier' && node.property.name === 'prototype' && node.parent.property) {
    jsType = node.object.name;
    propertyName = node.parent.property.name;
  } else if (node.property.type === 'Identifier' && node.object.type === 'Identifier') {
    jsType = node.object.name;
  } else {
    jsType = node.object.type.replace('Expression', '');
  }

  propertyName = propertyName || node.property.name || node.property.value;

  return { propertyName: propertyName, jsType: jsType };
};

/**
 * Determine if a jsType's usage of propertyName is valid
 * @param {String} jsType - the JS type to validate
 * @param {String} propertyName - the property name to validate usage of on jsType
 * @param {String} usageType - how propertyName is being used
 * @return {Boolean} - is the usage invalid?
 */
var isInvalid = function isInvalid(jsType, propertyName, usageType) {
  if (typeof propertyName !== 'string' || typeof jsType !== 'string' || !(0, _isJsType2.default)(jsType)) {
    return false;
  }

  var isExpression = usageType === 'ExpressionStatement' || usageType === 'MemberExpression';
  var unknownGetterSetterOrjsTypeExpressed = isExpression && !(0, _isGetSetProp2.default)(jsType, propertyName) && !(0, _isProtoProp2.default)(jsType, propertyName) && !(0, _isObjProp2.default)(jsType, propertyName);

  var isFunctionCall = usageType === 'CallExpression';
  var getterSetterCalledAsFunction = isFunctionCall && (0, _isGetSetProp2.default)(jsType, propertyName);
  var unknownjsTypeCalledAsFunction = isFunctionCall && !(0, _isProtoProp2.default)(jsType, propertyName) && !(0, _isObjProp2.default)(jsType, propertyName);

  return unknownGetterSetterOrjsTypeExpressed || getterSetterCalledAsFunction || unknownjsTypeCalledAsFunction;
};

module.exports = function (context) {
  return {
    MemberExpression: function MemberExpression(node) {
      /* eslint complexity: [2, 9] */
      var isArgToParent = node.parent.arguments && node.parent.arguments.indexOf(node) > -1;
      var usageType = isArgToParent ? node.type : node.parent.type;

      var _getJsTypeAndProperty = getJsTypeAndPropertyName(node);

      var propertyName = _getJsTypeAndProperty.propertyName;
      var jsType = _getJsTypeAndProperty.jsType;


      if (isInvalid(jsType, propertyName, usageType) && isInvalid('Function', propertyName, usageType)) {
        context.report(node, 'Avoid using extended native objects');
      }
    }
  };
};