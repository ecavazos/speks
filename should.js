var Speks = module.parent.exports.Speks;

Object.prototype.shouldEqual = function(expected) {
  puts(Speks.zee)
  Speks.equal(expected, this) ? Speks.Runner.pass() : Speks.Speks.Runner.fail('Expected:\n' + Speks.stringer(expected) + '\n\n' + 'Actual:\n' + Speks.stringer(this));
};

Object.prototype.shouldNotEqual = function(expected) {
  !Speks.equal(expected, this) ? Speks.Runner.pass() : Speks.Runner.fail('Expected:\n' + Speks.stringer(expected) + '\n\n' + 'Actual:\n' + Speks.stringer(this));
};

Object.prototype.shouldBeSame = function(expected) {
  (this === expected) ? Speks.Runner.pass() : Speks.Runner.fail('Expected ' + Speks.stringer(this) + ' to be the same as ' + Speks.stringer(expected));
};

Object.prototype.shouldNotBeSame = function(expected) {
  (this !== expected) ? Speks.Runner.pass() : Speks.Runner.fail('Expected ' + this + ' to not be the same as ' + expected);
};

Boolean.prototype.shouldBeTrue = function() { 
  this ? Speks.Runner.pass() : Speks.Runner.fail('Expected ' + this + ' to be true');
};

Boolean.prototype.shouldBeFalse = function() {
  !this ? Speks.Runner.pass() : Speks.Runner.fail('Expected ' + this + ' to be false');
};

String.prototype.shouldMatch = function(expected) {
  this.match(expected) ? Speks.Runner.pass() : Speks.Runner.fail('Expected:\n' + expected + '\n\n' + 'Actual:\n' + this);
};

String.prototype.shouldNotMatch = function(expected) {
  !this.match(expected) ? Speks.Runner.pass() : Speks.Runner.fail('Expected:\n' + expected + '\n\n' + 'Actual:\n' + this);
};

Number.prototype.shouldBeGreaterThan = function(number) {
  this > number ? Speks.Runner.pass() : Speks.Runner.fail('Expected ' + this + ' to be greater than ' + number);
};

Number.prototype.shouldBeLessThan = function(number) {
  this < number ? Speks.Runner.pass() : Speks.Runner.fail('Expected ' + this + ' to be less than ' + number);
};

// should have
// should be of type
