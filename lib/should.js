var strutil = require('./strutil');
var equalizor = require('./equalizor');
var sys = require('sys');

var should = exports;

should.value = function (actual) {
  function Sut(actual) {
    this.actual = actual;
  };

  Sut.prototype = {
    
    shouldEqual: function (expected) {
      var cond = equalizor.equal(expected, this.actual);
      var fail = 'Expected:\n' + strutil.tostr(expected) + '\n\n' + 
                 'Actual:\n' + strutil.tostr(this.actual);

      this.core(cond, fail);
    },

    shouldNotEqual: function (expected) {
      var cond = !equalizor.equal(expected, this.actual);
      var fail = 'Expected:\n' + strutil.tostr(expected) + '\n\n' +
                 'Actual:\n' + strutil.tostr(this.actual);

      this.core(cond, fail);
    },

    shouldBeSame: function (expected) {
      var cond = this.actual === expected;
      var fail = 'Expected ' + strutil.tostr(this.actual) +
                 ' to be the same as ' + strutil.tostr(expected);
      this.core(cond, fail);
    },

    core: function (condition, message) {
      if (condition) return;
      throw message;
    }
  };

  return new Sut(actual);
};

exports.init = function (runner) {
  var runr = runner;

  Object.prototype.shouldEqual = function (expected) {
    should.value(this).shouldEqual(expected);
  };

  Object.prototype.shouldNotEqual = function (expected) {
    should.value(this).shouldNotEqual(expected);
  };

  Object.prototype.shouldBeSame = function (expected) {
    should.value(this).shouldBeSame(expected);
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
    if (condition) return;

    throw message;
  }

};
