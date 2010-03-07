var strutil = require("./strutil");
var equalizor = require("./equalizor");

var should = exports;

var value = should.value = function (actual) {
  function Sut(actual) {
    this.actual = actual;
  };

  // this prototyping has to happen here
  // otherwise the should prototype methods won"t be
  // replaced and we get an infinite loop.
  // I know this is inefficient and will probably be an
  // opportunity to optimize in the future.

  Sut.prototype = {
    
    shouldEqual: function (expected) {
      var cond = equalizor.equal(expected, this.actual);
      var fail = "Expected:\n" + strutil.tostr(expected) + "\n\n" + 
                 "Actual:\n" + strutil.tostr(this.actual);

      this.core(cond, fail);
    },

    shouldNotEqual: function (expected) {
      var cond = !equalizor.equal(expected, this.actual);
      var fail = "Expected:\n" + strutil.tostr(expected) + "\n\n" +
                 "Actual:\n" + strutil.tostr(this.actual);

      this.core(cond, fail);
    },

    shouldBeSame: function (expected) {
      var cond = this.actual === expected;
      var fail = "Expected " + strutil.tostr(this.actual) +
                 " to be the same as " + strutil.tostr(expected);
      this.core(cond, fail);
    },

    shouldNotBeSame: function (expected) {
      var cond = this.actual !== expected;
      var fail = "Expected " + strutil.tostr(this.actual) +
                 " to not be the same as " + strutil.tostr(expected);

      this.core(cond, fail);
    },

    shouldBeTrue: function () {
      var cond = this.actual;
      var fail = "Expected " + this.actual + " to be true";

      this.core(cond, fail);
    },

    shouldBeFalse: function () {
      var cond = !this.actual;
      var fail = "Expected " + this.actual + " to be false";

      this.core(cond, fail);
    },

    shouldMatch: function (expected) {
      var cond = this.actual.match(expected);
      var fail = "Expected:\n" + strutil.tostr(expected) + "\n\n" +
                 "Actual:\n" + strutil.tostr(this.actual);
      
      this.core(cond, fail);
    },

    shouldNotMatch: function (expected) {
      var cond = !this.actual.match(expected);
      var fail = "Expected:\n" + strutil.tostr(expected) + "\n\n" +
                 "Actual:\n" + strutil.tostr(this.actual);
      
      this.core(cond, fail);
    },

    shouldBeGreaterThan: function (expected) {
      var cond = this.actual > expected;
      var fail = "Expected " + this.actual + " to be greater than " + expected;

      this.core(cond, fail);
    },

    shouldBeLessThan: function (expected) {
      var cond = this.actual < expected;
      var fail = "Expected " + this.actual + " to be less than " + expected;

      this.core(cond, fail);
    },

    shouldThrow: function () {
      var fail = "Expected " + strutil.tostr(this.actual) + " to throw";

      try { this.actual(); }
      catch (e) {
        return {
          exception: function (expected) {
            value(e).shouldEqual(expected);
          }
        };
      }

      this.core(false, fail);
    },

    shouldNotThrow: function () {
      var fail = "Expected " + strutil.tostr(this.actual) + " not to throw";
      var cond = true;

      try { this.actual(); }
      catch (e) { cond = false; }

      this.core(cond, fail);
    },

    core: function (condition, message) {
      if (condition) return;
      throw message;
    }
  };

  return new Sut(actual);
};

