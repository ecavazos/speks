var sys = require('sys');
var path = require('path');
var posix = require('posix');
var options = require('./options');
var results = require('./results');

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
    sys.print(this.opts.verbose ? 'Fail ' : 'F');
    this.failures.push(this.specs.join(' ') + '\n' + message + '\n\n');
  },

  pass: function() {
    sys.print(this.opts.verbose ? 'Pass ' : '.');
    this.successes.push(this.specs.join(' ') + '\n');
  },

  run: function() {

    var _specDir = path.dirname(__filename).replace('lib', '') + 'spec/';
    var _files = [];
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
      _self.specs.push(name);
      
      if (_self.opts.verbose) sys.print(name);
      
      _beforeEach = _afterEach = function() {};
      
      func();

      if (_self.opts.verbose) sys.print('\n\n');

      _self.specs.pop();
    }
   
    function it(name, func) {
      _self.total++;
      _self.specs.push(name);
      
      if (_self.opts.verbose) sys.print('\n ' + name + ' : ');

      _beforeEach();

      try {
        func();
      } catch(e) {
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

    function gatherSpecs() {
      if(_self.opts.filename) {
        _files.push(_self.opts.filename);
        return;
      }

      _files = posix.readdir(_specDir).wait();
    }

    function execSpecs() {
      for(var i = 0, ii = _files.length; i < ii; i++) {
        var file = _files[i];
        if(!file.match(/_spec.js$/)) continue;

        if (_self.opts.verbose) sys.puts(file);
        
        var spec = posix.cat(_specDir + file, 'utf8').wait();

        // HACK: node appears to hate people that require modules up one or more
        // directories so I have to modify request.paths
        require.paths.unshift(process.cwd());
        require.paths.unshift(_specDir);

        eval(spec);
      }

      sys.puts('\n');
    }

    function outputResults() {
      process.addListener('exit', function () {
        results.out(_self.total, _self.successes, _self.failures);
      });
    }

    gatherSpecs();
    execSpecs();
    outputResults();
  }
  
};
