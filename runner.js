// require
var path = require('path');
var posix = require('posix');

Runner = {
  total: 0,
  specs: [],
  successes: [],
  failures: [],

  fail: function(message) {
    print(Options.verbose ? 'Fail ' : 'F');
    Runner.failures.push(Runner.specs.join(' ') + '\n' + message + '\n\n');
  },

  pass: function() {
    print(Options.verbose ? 'Pass ' : '.');
    Runner.successes.push(Runner.specs.join(' ') + '\n');
  },

  run: function() { 
    var specDirectory = path.dirname(__filename) + '/spec/';
    var files = [];

    Options.init();

    function _error(message) {
      print(Options.verbose ? 'Error (' + message + ') ' : 'E');
      Runner.failures.push(Runner.specs.join(' ') + '\n' + message + '\n');
    }

    // =======================================
    // speks api
    // =======================================

    function describe(name, func) {
      Runner.specs.push(name);
      if (Options.verbose) print(name);
      specBeforeEach = specAfterEach = function() {};
      func();
      if (Options.verbose) print('\n\n');
      Runner.specs.pop();
    }
   
    function it(name, func) {
      Runner.total++;
      Runner.specs.push(name);
      
      if (Options.verbose) print('\n '+name+' : ');

      specBeforeEach();

      try {
        func();
      } catch(e) {
        if (e != 'fail') _error(e);
      }

      Runner.specs.pop();
      specAfterEach();
    }

    function beforeEach(func) {
      specBeforeEach = func;
    }
   
    function afterEach(func) {
      specAfterEach = func;
    }

    // =======================================
    // end speks api
    // =======================================

    function _findFiles() {
      if(Options.fileName) {
        files.push(Options.fileName.substr(1)); // remove leading comma
        return;
      }

      files = posix.readdir(specDirectory).wait();
    }

    function _execSpecs() {
      for(var i = 0, ii = files.length; i < ii; i++) {
        var file = files[i];
        if(!file.match(/_spec.js$/)) continue;

        if (Options.verbose) puts(file);
        var spec = posix.cat(specDirectory + '/' + file, 'utf8').wait();
        eval(spec);
      }

      puts('\n');
    }

    function _results() {
      process.addListener('exit', function () {
        results(Runner.total, Runner.successes, Runner.failures);
      });
    }

    _findFiles();
    _execSpecs();
    _results();
  }
  
};
