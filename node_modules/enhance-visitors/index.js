'use strict';

const _ = require('lodash/fp');

const merge = _.mergeWith((prev, next, key) => {
  if (!prev) {
    return next;
  }
  return node => {
    if (/:exit$/.test(key)) {
      next(node);
      prev(node);
    } else {
      prev(node);
      next(node);
    }
  };
});

const mergeVisitors = _.reduce(merge, {});

const visitIf = predicates => visitor => node => {
  const isValid = predicates.every(fn => fn(node));
  if (isValid) {
    return visitor(node);
  }
};

module.exports = {
  mergeVisitors,
  visitIf
};
