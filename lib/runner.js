var sys = require("sys");
var path = require("path");
var fs = require("fs");

var opts = require("./option_parser");
var results = require("./results");
var coll = require("./collector")
var should = require("./should");

var Runner = exports.Runner = function () {
  this.total = 0;
  this.specs = [];
  this.failures = [];
  this.opts = {};
};

Runner.prototype = {

  fail: function (message) {
    var f = this.opts.verbose ? "Fail " : "F";
    sys.print("\033[31m" + f + "\033[37m");
    this.failures.push(this.specs.join(" ") + "\n" + message + "\n\n");
  },

  pass: function () {
    var p = this.opts.verbose ? "Pass " : ".";
    sys.print("\033[32m" + p + "\033[37m");
  },

  error: function (message) {
    sys.print(this.opts.verbose ? "Error (" + message + ") " : "E");
    this.failures.push(this.specs.join(" ") + "\n" + message + "\n");
  },

  run: function () {

    var _dir = path.dirname(__filename).replace("lib", "") + "spec/";
    var _self = this;

    this.opts = opts.parse(process.ARGV);
    should.init();

    // =======================================
    // speks test structure
    // =======================================

    function describe(name, func) {
      this._sut = name;

      initHooks(this);

      _self.specs.push(name);

      func();

      _after();

      if (_self.opts.verbose)
        sys.print("\n\n");

      _self.specs.pop();
    }
   
    function it(name, func) {

      _self.total++;
      _self.specs.push(name);
      
      if (_self.opts.verbose)
        sys.print("\n " + _sut + " " + name + " : ");

      if(_before) {
        _before();
        _before = null;
      }

      _beforeEach();

      try {
        func();
        _self.pass();
      } catch (e) {
        _self.fail(e);
      }

      _self.specs.pop();
      _afterEach();
    }
    
    function initHooks(scope) {
      var hooks = ["before", "beforeEach", "afterEach", "after"];
      for (var i = 0, ii = hooks.length; i < ii; i++) {
        (function(name, internal) {
          scope[internal] = function () {}; // init to empty function
          scope[name] = function (func) { scope[internal] = func };
        })(hooks[i], ("_" + hooks[i]));
      }
    }

    // =======================================
    // speks test structure
    // =======================================

    function readSpecs(paths, callback) {
      var _pending = 0,
          _interval,
          _specs = [];

      function initInterval() {
        if (_interval) return;

        _interval = setInterval(function () {
          if (_pending > 0) return;
          clearInterval(_interval);
          callback(null, _specs);
        }, 100);
      }

      for (var i = 0, ii = paths.length; i < ii; i++) {

        (function (path) {
          _pending++;
          fs.readFile(path, "utf8", function (err, spec) {
            if(err) {
              callback(err);
              return;
            }
            _specs.push({ path: path, spec: spec });
            _pending--;
          });
          initInterval();

        })(paths[i]);
      }
    }

    function outputResults() {
      process.addListener("exit", function () {
        var r = results.format(_self.total, _self.failures);
        sys.puts(r);
      });
    }

    function execute(specs) {
      for (var i = 0, ii = specs.length; i < ii; i++) {
        if (_self.opts.verbose) {
          var num = parseInt(i) + 1;
          sys.puts(num + ". " + specs[i].name + ":");
        }

        eval(specs[i].spec);
      }

      sys.puts("\n");
      outputResults();
    }

    coll.collect((this.opts.specdir || _dir), this.opts.filename,
        function (err, paths) {
          if(err) throw err;
          readSpecs(paths, function(err, specs) {
            if(err) throw err;
            execute(specs);
          });
        });
  }
  
};
