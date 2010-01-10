var strutil = require('./strutil');
var equalizor = require('./equalizor');

exports.Init = function (runner) {
  var runr = runner;

  Object.prototype.shouldEqual = function (expected) {
    var cond = equalizor.equal(expected, this);
    var fail = 'Expected:\n' + strutil.tostr(expected) + '\n\n' + 
               'Actual:\n' + strutil.tostr(this);

    core(cond, fail);
  };

  Object.prototype.shouldNotEqual = function (expected) {
    var cond = !equalizor.equal(expected, this);
    var fail = 'Expected:\n' + strutil.tostr(expected) + '\n\n' +
               'Actual:\n' + strutil.tostr(this);

    core(cond, fail);
  };

  Object.prototype.shouldBeSame = function (expected) {
    var cond = this === expected;
    var fail = 'Expected ' + strutil.tostr(this) +
               ' to be the same as ' + strutil.tostr(expected);

    core(cond, fail);
  };

  Object.prototype.shouldNotBeSame = function (expected) {
    var cond = this !== expected;
    var fail = 'Expected ' + strutil.tostr(this) +
               ' to not be the same as ' + strutil.tostr(expected);

    core(cond, fail);
  };

  Boolean.prototype.shouldBeTrue = function () { 
    var cond = this;
    var fail = 'Expected ' + this + ' to be true';

    core(cond, fail);
  };

  Boolean.prototype.shouldBeFalse = function () {
    var cond = !this;
    var fail = 'Expected ' + this + ' to be false';

    core(cond, fail);
  };

  String.prototype.shouldMatch = function (expected) {
    var cond = this.match(expected);
    var fail = 'Expected:\n' + strutil.tostr(expected) + '\n\n' +
               'Actual:\n' + strutil.tostr(this);
    
    core(cond, fail);
  };

  String.prototype.shouldNotMatch = function (expected) {
    var cond = !this.match(expected);
    var fail = 'Expected:\n' + strutil.tostr(expected) + '\n\n' +
               'Actual:\n' + strutil.tostr(this);
    
    core(cond, fail);
  };

  Number.prototype.shouldBeGreaterThan = function (expected) {
    var cond = this > expected;
    var fail = 'Expected ' + this + ' to be greater than ' + expected;

    core(cond, fail);
  };

  Number.prototype.shouldBeLessThan = function (expected) {
    var cond = this < expected;
    var fail = 'Expected ' + this + ' to be less than ' + expected;

    core(cond, fail);
  };

  // should have
  // should be of type

  function core(condition, message) {
    if(condition) {
      runr.pass();
      return;
    }

    runr.fail(message);
  }

};
