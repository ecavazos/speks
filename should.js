// requires: runner
// requires: stringer

Object.prototype.shouldEqual = function(expected) {
  equal(expected, this) ? Runner.pass() : Runner.fail('Expected:\n' + stringer(expected) + '\n\n' + 'Actual:\n' + stringer(this));
};

Object.prototype.shouldNotEqual = function(expected) {
  !equal(expected, this) ? Runner.pass() : Runner.fail('Expected:\n' + stringer(expected) + '\n\n' + 'Actual:\n' + stringer(this));
};

Object.prototype.shouldBeSame = function(expected) {
  (this === expected) ? Runner.pass() : Runner.fail('Expected ' + stringer(this) + ' to be the same as ' + stringer(expected));
};

Object.prototype.shouldNotBeSame = function(expected) {
  (this !== expected) ? Runner.pass() : Runner.fail('Expected ' + this + ' to not be the same as ' + expected);
};

Boolean.prototype.shouldBeTrue = function() { 
  this ? Runner.pass() : Runner.fail('Expected ' + this + ' to be true');
};

Boolean.prototype.shouldBeFalse = function() {
  !this ? Runner.pass() : Runner.fail('Expected ' + this + ' to be false');
};

String.prototype.shouldMatch = function(expected) {
  this.match(expected) ? Runner.pass() : Runner.fail('Expected:\n' + expected + '\n\n' + 'Actual:\n' + this);
};

String.prototype.shouldNotMatch = function(expected) {
  !this.match(expected) ? Runner.pass() : Runner.fail('Expected:\n' + expected + '\n\n' + 'Actual:\n' + this);
};

Number.prototype.shouldBeGreaterThan = function(number) {
  this > number ? Runner.pass() : Runner.fail('Expected ' + this + ' to be greater than ' + number);
};

Number.prototype.shouldBeLessThan = function(number) {
  this < number ? Runner.pass() : Runner.fail('Expected ' + this + ' to be less than ' + number);
};

// should have
// should be of type
