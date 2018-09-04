var assert  = require('assert');
var Promise = require('es6-promise').Promise
var request = require('./')(require('superagent'), Promise);
var http    = require('http');
var debug   = require('debug')('test:index');

function respondWith(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'text/plain',
    'Content-Length': body.length
  });
  res.end(body);
}

describe('superagent-promise', function() {
  // start the server
  var server;
  var baseURL;
  var successBody = 'woot';
  var errorBody = 'Not Found';

  var connections = {};
  before(function(done) {
    server = http.createServer(function(req, res) {
      if (/success$/.test(req.url)) {
        debug('Responding with 200');
        respondWith(res, 200, successBody);
        return;

      } else if(/NotFound$/.test(req.url)) {
        debug('Responding with 404');
        respondWith(res, 404, errorBody);

      } else if(/error$/.test(req.url)) {
        debug('Responding with 200, but mismatching Content-Length');
        res.writeHead(200, {
          'Content-Length': successBody.length - 2,
          'Content-Type': 'text/plain'
        });
        res.end(successBody);
      } else if (/redirect/.test(req.url)) {
        debug('Responding with a 302 redirect');
        var url = baseURL + '/success';
        res.writeHead(303, {
          'Location': url
        });
        res.end();
       }
    });

    var i = 0;
    // for some reason the checks on convenience methods open connections
    // that don't get closed so we have to do some clean up
    server.on('connection', function(conn) {
      conn.__connCount = i;
      connections[i++] = conn;
      conn.on('close', function() {
        delete connections[conn.__connCount];
      })
    });

    server.listen(0, function() {
      var addr = server.address();
      debug('server up at', addr);
      baseURL = 'http://' + addr.address + ':' + addr.port;
      done();
    });
  });

  after(function(done) {
    for (var conn in connections) {
      connections[conn].destroy();
    }
    server.close(function() {
      debug('server down');
      done();
    });
    server = undefined;
  });

  describe('convenience methods', function() {
    [
      'head',
      'options',
      'get',
      'post',
      'put',
      'patch',
      'del'
    ].forEach(function(method) {
      describe('#'+method, function() {
        it('should have `then` and `end`', function() {
          var promiseRequest = request[method](baseURL);
          assert(promiseRequest.then instanceof Function);
          assert(promiseRequest.end instanceof Function);
        });

        it('`end` should return a promise', function() {
          var p = request[method](baseURL).end();
          assert(p instanceof Promise);
        });

        it('`then` should return a promise', function() {
          var p = request[method](baseURL).then(function() { });
          assert(p instanceof Promise);
        });
      })
    });
  })

  describe('#end', function() {
    it('should succeed on 200', function(done) {
      var url = baseURL + '/success';

      request('GET', url).end().then(function(res) {
        assert.equal(res.text, successBody);
      }).then(done).catch(done);
    });

    it('should fail on 404', function(done) {
      var url = baseURL + '/NotFound';

      request('GET', url).end().then(undefined, function(err) {
        assert.equal(err.status, 404)
        assert.equal(err.response.text, errorBody);

      }).then(done).catch(done);
    });

    it('should fail if content length is mismatched', function(done) {
      var url = baseURL + '/error';

      request('GET', url).end().then(function(res) {
        done(new Error('Got response for mismatched Content-Length'))

      }, function(err) {
        assert.ok(err);
        assert.ok('response' in err);
        done();
      });
    });

    it('should follow redirects', function() {
      var url = baseURL + '/redirect';

      return request('GET', url).end().then(function(res) {
        assert.equal(res.text, successBody);
      });
    });
  });

  describe('#then', function() {
    it('should succeed on 200', function(done) {
      var url = baseURL + '/success';

      request('GET', url).then(function(res) {
        assert.equal(res.text, successBody);
      }).then(done).catch(done);
    });

    it('issue 404 request', function(done) {
      var url = baseURL + '/NotFound';

      request('GET', url).then(undefined, function(err) {
        assert.equal(err.status, 404)
        assert.equal(err.response.text, errorBody);

      }).then(done).catch(done);
    });

    it('test error', function(done) {
      var url = baseURL + '/error';

      request('GET', url).then(function(res) {
        done(new Error('error should not should not succeed'));

      }, function(err) {
        assert.ok(err);
        assert.ok('response' in err);
        done();
      });
    });

    it('issue request w. redirect', function() {
      var url = baseURL + '/redirect';

      return request('GET', url).then(function(res) {
        assert.equal(res.text, successBody);
      });
    });

  });
});
