var sys = require("sys");
var path = require("path");
var posix = require("posix");
var opts = require("./option_parser");
var results = require("./results");
var coll = require("./collector")
var should = require("./should");

var Runner = exports.Runner = function () {
  this.total = 0;
  this.specs = [];
  this.successes = [];
  this.failures = [];
  this.opts = {};
};

Runner.prototype = {

  fail: function (message) {
    sys.print(this.opts.verbose ? "Fail " : "F");
    this.failures.push(this.specs.join(" ") + "\n" + message + "\n\n");
  },

  pass: function () {
    sys.print(this.opts.verbose ? "Pass " : ".");
    this.successes.push(this.specs.join(" ") + "\n");
  },

  run: function () {

    var _specDir = path.dirname(__filename).replace("lib", "") + "spec/";
    var _self = this;

    this.opts = opts.parse(process.ARGV);

    function error(message) {
      sys.print(_self.opts.verbose ? "Error (" + message + ") " : "E");
      _self.failures.push(_self.specs.join(" ") + "\n" + message + "\n");
    }

    // =======================================
    // speks test structure
    // =======================================

    function describe(name, func) {
      should.Init(_self);

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
      } catch (e) {
        if (e != "fail") error(e);
      }

      _self.specs.pop();

      _afterEach();
    }
    
    function initHooks(scope) {
      var hooks = ["before", "beforeEach", "afterEach", "after"];
      for (var i in hooks) {
        (function(name, internal) {
          scope[internal] = function () {}; // init to empty function
          scope[name] = function (func) { scope[internal] = func };
        })(hooks[i], ("_" + hooks[i]));
      }
    }

    // =======================================
    // speks test structure
    // =======================================

    function readSpecs(specs) {
      var _promise = new process.Promise(),
          _subPromises = [],
          _interval
          _codes = [];

      function initInterval() {
        if (_interval) return;

        _interval = setInterval(function () {
          if (_subPromises.length) return;
          clearInterval(_interval);
          _promise.emitSuccess(_codes);
        }, 100);
      }

      for (var i = 0, ii = specs.length; i < ii; i++) {

        (function (file) {
          var sp = posix.cat(file, "utf8");
          _subPromises.push(sp);
          
          initInterval();

          sp.addCallback(function (spec) {
            _codes.push({ file: file, code: spec });
            _subPromises.pop();
          });

        })(specs[i]);
      }

      return _promise;
    }

    function outputResults() {
      process.addListener("exit", function () {
        var r = results.format(_self.total, _self.successes, _self.failures);
        sys.puts(r);
      });
    }

    function execute(codes) {
      for (var i in codes) {
        if (_self.opts.verbose) {
          var num = parseInt(i) + 1;
          sys.puts(num + ". " + codes[i].file + ":");
        }

        eval(codes[i].code);
      }

      sys.puts("\n");
      outputResults();
    }

    coll.collect(_specDir, this.opts.filename)
      .addCallback(function (specs) {
        readSpecs(specs).addCallback(execute);
      });
  }
  
};
