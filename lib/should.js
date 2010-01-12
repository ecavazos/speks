var strutil = require('./strutil');
var equalizor = require('./equalizor');

var should = exports;

var value = should.value = function (actual) {
  function Sut(actual) {
    this.actual = actual;
  };

  // this prototyping has to happen here
  // otherwise the should prototype methods won't be
  // replaced and we get a infinite loop

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

    shouldNotBeSame: function (expected) {
      var cond = this.actual !== expected;
      var fail = 'Expected ' + strutil.tostr(this.actual) +
                 ' to not be the same as ' + strutil.tostr(expected);

      this.core(cond, fail);
    },

    shouldBeTrue: function () {
      var cond = this.actual;
      var fail = 'Expected ' + this.actual + ' to be true';

      this.core(cond, fail);
    },

    shouldBeFalse: function () {
      var cond = !this.actual;
      var fail = 'Expected ' + this.actual + ' to be false';

      this.core(cond, fail);
    },

    shouldMatch: function (expected) {
      var cond = this.actual.match(expected);
      var fail = 'Expected:\n' + strutil.tostr(expected) + '\n\n' +
                 'Actual:\n' + strutil.tostr(this.actual);
      
      this.core(cond, fail);
    },

    shouldNotMatch: function (expected) {
      var cond = !this.actual.match(expected);
      var fail = 'Expected:\n' + strutil.tostr(expected) + '\n\n' +
                 'Actual:\n' + strutil.tostr(this.actual);
      
      this.core(cond, fail);
    },

    shouldBeGreaterThan: function (expected) {
      var cond = this.actual > expected;
      var fail = 'Expected ' + this.actual + ' to be greater than ' + expected;

      this.core(cond, fail);
    },

    shouldBeLessThan: function (expected) {
      var cond = this.actual < expected;
      var fail = 'Expected ' + this.actual + ' to be less than ' + expected;

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
    value(this).shouldEqual(expected);
  };

  Object.prototype.shouldNotEqual = function (expected) {
    value(this).shouldNotEqual(expected);
  };

  Object.prototype.shouldBeSame = function (expected) {
    value(this).shouldBeSame(expected);
  };

  Object.prototype.shouldNotBeSame = function (expected) {
    value(this).shouldNotBeSame(expected);
  };

  Boolean.prototype.shouldBeTrue = function () { 
    value(this).shouldBeTrue();
  };

  Boolean.prototype.shouldBeFalse = function () {
    value(this).shouldBeFalse();
  };

  String.prototype.shouldMatch = function (expected) {
    value(this).shouldMatch(expected);
  };

  String.prototype.shouldNotMatch = function (expected) {
    value(this).shouldNotMatch(expected);
  };

  Number.prototype.shouldBeGreaterThan = function (expected) {
    value(this).shouldBeGreaterThan(expected);
  };

  Number.prototype.shouldBeLessThan = function (expected) {
    value(this).shouldBeLessThan(expected);
  };

  // should have
  // should be of type

};
