suite('browser support', function() {
  var superagent = require('superagent-promise');

  test('get a fixture', function() {
    return superagent.get('/test/fixture.txt').
      end().
      then(function(res) {
        assert.equal(res.text, 'fixtureyay');
      });
  });

});
