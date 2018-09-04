/**
 * Promise wrapper for superagent
 */

function wrap(superagent, Promise) {
  /**
   * Request object similar to superagent.Request, but with end() returning
   * a promise.
   */
  function PromiseRequest() {
    superagent.Request.apply(this, arguments);
  }

  // Inherit form superagent.Request
  PromiseRequest.prototype = Object.create(superagent.Request.prototype);

  /** Send request and get a promise that `end` was emitted */
  PromiseRequest.prototype.end = function(cb) {
    var _end = superagent.Request.prototype.end;
    var self = this;

    return new Promise(function(accept, reject) {
      _end.call(self, function(err, response) {
        if (cb) {
          cb(err, response);
        }

        if (err) {
          err.response = response;
          reject(err);
        } else {
          accept(response);
        }
      });
    });
  };

  /** Provide a more promise-y interface */
  PromiseRequest.prototype.then = function(resolve, reject) {
    var _end = superagent.Request.prototype.end;
    var self = this;

    return new Promise(function(accept, reject) {
      _end.call(self, function(err, response) {
        if (err) {
          err.response = response;
          reject(err);
        } else {
          accept(response);
        }
      });
    }).then(resolve, reject);
  };

  /**
   * Request builder with same interface as superagent.
   * It is convenient to import this as `request` in place of superagent.
   */
  var request = function(method, url) {
    return new PromiseRequest(method, url);
  };

  /** Helper for making an options request */
  request.options = function(url) {
    return request('OPTIONS', url);
  }

  /** Helper for making a head request */
  request.head = function(url, data) {
    var req = request('HEAD', url);
    if (data) {
      req.send(data);
    }
    return req;
  };

  /** Helper for making a get request */
  request.get = function(url, data) {
    var req = request('GET', url);
    if (data) {
      req.query(data);
    }
    return req;
  };

  /** Helper for making a post request */
  request.post = function(url, data) {
    var req = request('POST', url);
    if (data) {
      req.send(data);
    }
    return req;
  };

  /** Helper for making a put request */
  request.put = function(url, data) {
    var req = request('PUT', url);
    if (data) {
      req.send(data);
    }
    return req;
  };

  /** Helper for making a patch request */
  request.patch = function(url, data) {
    var req = request('PATCH', url);
    if (data) {
      req.send(data);
    }
    return req;
  };

  /** Helper for making a delete request */
  request.del = function(url) {
    return request('DELETE', url);
  };

  // Export the request builder
  return request;
}

module.exports = wrap;
