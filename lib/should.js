var strutil = require('./strutil');
var equalizor = require('./equalizor');

// this module is intended to be mixed-in with an instance of Runner (runner.js)

exports.Init = function (runner) {
  var runr = runner;

  Object.prototype.shouldEqual = function (expected) {
    if (equalizor.equal(expected, this)) {
      runr.pass();
    } else {
      runr.fail('Expected:\n' + strutil.tostr(expected) + '\n\n' +
                'Actual:\n' + strutil.tostr(this));
    }
  };

  Object.prototype.shouldNotEqual = function (expected) {
    if (!equalizor.equal(expected, this)) {
      runr.pass();
    } else {
      runr.fail('Expected:\n' + strutil.tostr(expected) + '\n\n' +
                'Actual:\n' + strutil.tostr(this));
    }
  };

  Object.prototype.shouldBeSame = function (expected) {
    if (this === expected) {
      runr.pass();
    } else {
      runr.fail('Expected ' + strutil.tostr(this) +
                ' to be the same as ' + strutil.tostr(expected));
    }
  };

  Object.prototype.shouldNotBeSame = function (expected) {
    if (this !== expected) {
      runr.pass();
    } else {
      runr.fail('Expected ' + strutil.tostr(this) +
                ' to not be the same as ' + strutil.tostr(expected));
    }
  };

  Boolean.prototype.shouldBeTrue = function () { 
    if (this) {
      runr.pass();
    } else {
      runr.fail('Expected ' + this + ' to be true');
    }
  };

  Boolean.prototype.shouldBeFalse = function () {
    if (!this) {
      runr.pass();
    } else {
      runr.fail('Expected ' + this + ' to be false');
    }
  };

  String.prototype.shouldMatch = function (expected) {
    if (this.match(expected)) {
      runr.pass();
    } else {
      runr.fail('Expected:\n' + strutil.tostr(expected) + '\n\n' +
                'Actual:\n' + strutil.tostr(this));
    }
  };

  String.prototype.shouldNotMatch = function (expected) {
    if (!this.match(expected)) {
      runr.pass();
    } else {
      runr.fail('Expected:\n' + strutil.tostr(expected) + '\n\n' +
                'Actual:\n' + strutil.tostr(this));
    }
  };

  Number.prototype.shouldBeGreaterThan = function (expected) {
    if (this > expected) {
      runr.pass();
    } else {
      runr.fail('Expected ' + this + ' to be greater than ' + expected);
    }
  };

  Number.prototype.shouldBeLessThan = function (expected) {
    if (this < expected) {
      runr.pass();
    } else {
      runr.fail('Expected ' + this + ' to be less than ' + expected);
    }
  };

  // should have
  // should be of type

};
