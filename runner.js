var Speks = module.parent.exports.Speks;

var path = require('path');
var posix = require('posix');

var Runner = {
  total: 0,
  specs: [],
  successes: [],
  failures: [],
  opts: {},

  fail: function(message) {
    print(Runner.opts.verbose ? 'Fail' : 'F');
    Runner.failures.push(Runner.specs.join(' ') + '\n' + message + '\n\n');
  },

  pass: function() {
    print(Runner.opts.verbose ? 'Pass' : '.');
    Runner.successes.push(Runner.specs.join(' ') + '\n');
  },

  run: function() { 
    
    var specDirectory = path.dirname(__filename) + '/spec/';
    var files = [];

    Runner.opts = Speks.Options.parse(process.ARGV);
    
    function _error(message) {
      print(Runner.opts.verbose ? 'Error (' + message + ') ' : 'E');
      Runner.failures.push(Runner.specs.join(' ') + '\n' + message + '\n');
    }

    // =======================================
    // speks api
    // =======================================

    function describe(name, func) {
      Runner.specs.push(name);
      
      if (Runner.opts.verbose) print(name);
      
      _beforeEach = _afterEach = function() {};
      
      func();

      if (Runner.opts.verbose) print('\n\n');

      Runner.specs.pop();
    }
   
    function it(name, func) {
      Runner.total++;
      Runner.specs.push(name);
      
      if (Runner.opts.verbose) print('\n ' + name + ' : ');

      _beforeEach();

      try {
        func();
      } catch(e) {
        if (e != 'fail') _error(e);
      }

      Runner.specs.pop();

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
      if(Runner.opts.filename) {
        files.push(Runner.opts.filename);
        return;
      }

      files = posix.readdir(specDirectory).wait();
    }

    function _execSpecs() {
      for(var i = 0, ii = files.length; i < ii; i++) {
        var file = files[i];
        if(!file.match(/_spec.js$/)) continue;

        if (Runner.opts.verbose) puts(file);
        var spec = posix.cat(specDirectory + '/' + file, 'utf8').wait();
        eval(spec);
      }

      puts('\n');
    }

    function _results() {
      process.addListener('exit', function () {
        Speks.results(Runner.total, Runner.successes, Runner.failures);
      });
    }

    _findFiles();
    _execSpecs();
    _results();
  }
  
};

exports.Runner = Runner;
