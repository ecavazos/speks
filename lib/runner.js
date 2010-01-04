var sys = require('sys');
var path = require('path');
var posix = require('posix');
var options = require('./options');
var results = require('./results');
var coll = require('./collector')

var Runner = exports.Runner = function () {
  this.total = 0;
  this.specs = [];
  this.successes = [];
  this.failures = [];
  this.opts = {};

  // mixin should methods and initialize before
  // running any specs.
  process.mixin(this, require('./should'));
  this.shouldInit();
};

Runner.prototype = {

  fail: function (message) {
    sys.print(this.opts.verbose ? 'Fail ' : 'F');
    this.failures.push(this.specs.join(' ') + '\n' + message + '\n\n');
  },

  pass: function () {
    sys.print(this.opts.verbose ? 'Pass ' : '.');
    this.successes.push(this.specs.join(' ') + '\n');
  },

  run: function () {

    var _specDir = path.dirname(__filename).replace('lib', '') + 'spec/';
    var _self = this;

    this.opts = options.parse(process.ARGV);

    function error(message) {
      sys.print(_self.opts.verbose ? 'Error (' + message + ') ' : 'E');
      _self.failures.push(_self.specs.join(' ') + '\n' + message + '\n');
    }

    // =======================================
    // speks test structure
    // =======================================

    function describe(name, func) {

      this._beforeEach = this._afterEach = function () {};
      this._sut = name;

      _self.specs.push(name);

      func();

      if (_self.opts.verbose) sys.print('\n\n');

      _self.specs.pop();
    }
   
    function it(name, func) {
      _self.total++;
      _self.specs.push(name);
      
      if (_self.opts.verbose) sys.print('\n ' + _sut + ' ' + name + ' : ');

      _beforeEach();

      try {
        func();
      } catch (e) {
        if (e != 'fail') error(e);
      }

      _self.specs.pop();

      _afterEach();
    }

    function beforeEach(func) {
      _beforeEach = func;
    }
   
    function afterEach(func) {
      _afterEach = func;
    }

    // =======================================
    // speks test structure
    // =======================================

    function execSpecs(specs) {

      for (var i = 0, ii = specs.length; i < ii; i++) {
        var file = specs[i];

        if (_self.opts.verbose) sys.puts(file + ':');
        
        var spec = posix.cat(file, 'utf8').wait(); // TODO: make this nonblocking

        eval(spec);
      }

      sys.puts('\n');
    }

    function outputResults() {
      process.addListener('exit', function () {
        var r = results.format(_self.total, _self.successes, _self.failures);
        sys.puts(r);
      });
    }

    coll.collect(_specDir, this.opts.filename)
      .addCallback(function (specs) {
        execSpecs(specs);
        outputResults();
      });
  }
  
};
