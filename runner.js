var sys = require('sys');
var path = require('path');
var posix = require('posix');
var options = require('./options');
var results = require('./results')

var Runner = exports.Runner = function() {
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

  fail: function(message) {
    print(this.opts.verbose ? 'Fail' : 'F');
    this.failures.push(this.specs.join(' ') + '\n' + message + '\n\n');
  },

  pass: function() {
    print(this.opts.verbose ? 'Pass' : '.');
    this.successes.push(this.specs.join(' ') + '\n');
  },

  run: function() {

    var specDirectory = path.dirname(__filename) + '/spec/';
    var files = [];
    var _self = this;
    this.opts = options.parse(process.ARGV);

    function _error(message) {
      print(_self.opts.verbose ? 'Error (' + message + ') ' : 'E');
      _self.failures.push(_self.specs.join(' ') + '\n' + message + '\n');
    }

    // =======================================
    // speks api
    // =======================================

    function describe(name, func) {
      _self.specs.push(name);
      
      if (_self.opts.verbose) print(name);
      
      _beforeEach = _afterEach = function() {};
      
      func();

      if (_self.opts.verbose) print('\n\n');

      _self.specs.pop();
    }
   
    function it(name, func) {
      _self.total++;
      _self.specs.push(name);
      
      if (_self.opts.verbose) print('\n ' + name + ' : ');

      _beforeEach();

      try {
        func();
      } catch(e) {
        if (e != 'fail') _error(e);
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
    // end speks api
    // =======================================

    function _findFiles() {
      if(_self.opts.filename) {
        files.push(_self.opts.filename);
        return;
      }

      files = posix.readdir(specDirectory).wait();
    }

    function _execSpecs() {
      for(var i = 0, ii = files.length; i < ii; i++) {
        var file = files[i];
        if(!file.match(/_spec.js$/)) continue;

        if (_self.opts.verbose) puts(file);
        var spec = posix.cat(specDirectory + '/' + file, 'utf8').wait();
        eval(spec);
      }

      puts('\n');
    }

    function _results() {
      process.addListener('exit', function () {
        results.out(_self.total, _self.successes, _self.failures);
      });
    }

    _findFiles();
    _execSpecs();
    _results();
  }
  
};
