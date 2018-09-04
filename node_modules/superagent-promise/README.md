[![Build Status](https://img.shields.io/travis/lightsofapollo/superagent-promise/master.svg)](https://travis-ci.org/lightsofapollo/superagent-promise)

superagent-promise
==================

Simple/dumb promise wrapper for superagent. You must depend on `superagent` and your favorite Promise library directly.


## Usage

```js
var Promise = this.Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);

// method, url form with `end`
agent('GET', 'http://google.com')
  .end()
  .then(function onResult(res) {
    // do stuff
  }, function onError(err) {
    //err.response has the response from the server
  });

// method, url form with `then`
agent('GET', 'http://google.com')
  .then(function onResult(res) {
    // do stuff
  });


// helper functions: options, head, get, post, put, patch, del
agent.put('http://myxfoo', 'data')
  .end()
  .then(function(res) {
    // do stuff`
  });

// helper functions: options, head, get, post, put, patch, del
agent.put('http://myxfoo', 'data').
  .then(function(res) {
    // do stuff
  });


```
