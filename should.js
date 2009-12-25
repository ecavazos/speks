var strutil = require('./strutil');
var equalizor = require('./equalizor');

exports.shouldInit = function() {
  var runr = this;

  Object.prototype.shouldEqual = function(expected) {
    equalizor.equal(expected, this) ? runr.pass() : runr.fail('Expected:\n' + strutil.tostr(expected) + '\n\n' + 'Actual:\n' + Speks.stringer(this));
  };

  Object.prototype.shouldNotEqual = function(expected) {
    !equalizor.equal(expected, this) ? runr.pass() : runr.fail('Expected:\n' + strutil.tostr(expected) + '\n\n' + 'Actual:\n' + Speks.stringer(this));
  };

  Object.prototype.shouldBeSame = function(expected) {
    (this === expected) ? runr.pass() : runr.fail('Expected ' + strutil.tostr(this) + ' to be the same as ' + Speks.stringer(expected));
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

  Number.prototype.shouldBeGreaterThan = function(number) {
    this > number ? runr.pass() : runr.fail('Expected ' + this + ' to be greater than ' + number);
  };

  Number.prototype.shouldBeLessThan = function(number) {
    this < number ? runr.pass() : runr.fail('Expected ' + this + ' to be less than ' + number);
  };

  // should have
  // should be of type

};
