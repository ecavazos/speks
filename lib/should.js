var strutil = require('./strutil');
var equalizor = require('./equalizor');

exports.shouldInit = function() {
  var runr = this;

  Object.prototype.shouldEqual = function(expected) {
    equalizor.equal(expected, this) ? runr.pass() : runr.fail('Expected:\n' + strutil.tostr(expected) + '\n\n' + 'Actual:\n' + strutil.tostr(this));
  };

  Object.prototype.shouldNotEqual = function(expected) {
    !equalizor.equal(expected, this) ? runr.pass() : runr.fail('Expected:\n' + strutil.tostr(expected) + '\n\n' + 'Actual:\n' + strutil.tostr(this));
  };

  Object.prototype.shouldBeSame = function(expected) {
    (this === expected) ? runr.pass() : runr.fail('Expected ' + strutil.tostr(this) + ' to be the same as ' + strutil.tostr(expected));
  };

  Object.prototype.shouldNotBeSame = function(expected) {
    (this !== expected) ? runr.pass() : runr.fail('Expected ' + this + ' to not be the same as ' + expected);
  };

  Boolean.prototype.shouldBeTrue = function() { 
    this ? runr.pass() : runr.fail('Expected ' + this + ' to be true');
  };

  Boolean.prototype.shouldBeFalse = function() {
    !this ? runr.pass() : runr.fail('Expected ' + this + ' to be false');
  };

  String.prototype.shouldMatch = function(expected) {
    this.match(expected) ? runr.pass() : runr.fail('Expected:\n' + expected + '\n\n' + 'Actual:\n' + this);
  };

  String.prototype.shouldNotMatch = function(expected) {
    !this.match(expected) ? runr.pass() : runr.fail('Expected:\n' + expected + '\n\n' + 'Actual:\n' + this);
  };

  Number.prototype.shouldBeGreaterThan = function(expected) {
    this > expected ? runr.pass() : runr.fail('Expected ' + this + ' to be greater than ' + expected);
  };

  Number.prototype.shouldBeLessThan = function(expected) {
    this < expected ? runr.pass() : runr.fail('Expected ' + this + ' to be less than ' + expected);
  };

  // should have
  // should be of type

};
