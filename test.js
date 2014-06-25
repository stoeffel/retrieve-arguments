var retrieveArguments = require('./index.js'),
  assert = require('assert');

function namedFunction(name) {}
describe('retrieve-arguments', function() {
  var funcNoArgs, funcOneArgs, funcTwoArgs;
  beforeEach(function() {
    funcNoArgs = function() {};

    funcOneArgs = function(arg1) {};

    funcTwoArgs = function(arg1, arg2, arg3) {};
  });

  it('should fail if no function given', function() {
    assert.throws(retrieveArguments, Error);
    assert.throws(retrieveArguments.bind(this, {}), Error);
    assert.throws(retrieveArguments.bind(this, 'foo'), Error);
    assert.doesNotThrow(retrieveArguments.bind(this, function() {}), Error);
  });

  it('should return an empty array if the function has no arguments', function() {
    assert.deepEqual(retrieveArguments(funcNoArgs), []);
  });

  it('should return names of a function\'s arguments', function() {
    assert.deepEqual(retrieveArguments(funcOneArgs), ['arg1']);
    assert.deepEqual(retrieveArguments(funcTwoArgs), ['arg1', 'arg2', 'arg3']);
    assert.deepEqual(retrieveArguments(namedFunction), ['name']);
  });
});
