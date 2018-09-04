'use strict'
import isProtoProp from '../lib/'
import test from 'ava'

test('should throw error when type or property is not a string', t => {
  const typeTest = () => isProtoProp(1, 'prop')

  const propTest = () => isProtoProp('type', 1)

  t.throws(typeTest, TypeError)
  t.throws(propTest, TypeError)
})

test('should return false if not a js type', t => {
  t.falsy(isProtoProp('dog', 'bark'))
  t.falsy(isProtoProp('gulp', 'task'))
})

test('should return false if property is not on prototype', t => {
  t.falsy(isProtoProp('Array', 'count'))
  t.falsy(isProtoProp('Error', 'ignore'))
})

test('shoud return true if property is on prototype', t => {
  t.truthy(isProtoProp('Array', 'length'))
  t.truthy(isProtoProp('Object', 'toString'))
  t.truthy(isProtoProp('String', 'padEnd'))
})

test('should be case insensitive for types', t => {
  t.truthy(isProtoProp('array', 'length'))
  t.truthy(isProtoProp('ARRAY', 'length'))
})
