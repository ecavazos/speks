var sys     = require("sys");
var path    = require("path");
var fs      = require("fs");
var op      = require("./option_parser");
var results = require("./results");
var coll    = require("./collector");
var should  = require("./should");

var Runner = exports.Runner = function () {
  this.runnerData = {
    total: 0,
    failCount: 0,
    contexts: [],
    options: op.parse(process.ARGV)
  };
};

Runner.prototype = {

  fail: function (message) {
    var f = this.runnerData.options.verbose ? "Fail " : "F";
    sys.print("\033[31m" + f + "\033[37m");
  },

  pass: function () {
    var p = this.runnerData.options.verbose ? "Pass " : ".";
    sys.print("\033[32m" + p + "\033[37m");
  },

//  error: function (message) {
//    sys.print(this.options.verbose ? "Error (" + message + ") " : "E");
//    this.failures.push(this.specs.join(" ") + "\n" + message + "\n");
//  },
//
  dir: function () {
    return path.dirname(__filename).replace("lib", "") + "spec/";
  },

  initHooks: function (scope) {
    var hooks = ["before", "beforeEach", "afterEach", "after"];
    for (var i = 0, ii = hooks.length; i < ii; i++) {
      (function(name, internal) {
        scope[internal] = function () {}; // init to empty function
        scope[name] = function (func) { scope[internal] = func };
      })(hooks[i], ("_" + hooks[i]));
    }
  },

  readSpecs: function (paths, callback) {
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
  },

  outputResults: function () {
    var data = this.runnerData;
    process.addListener("exit", function () {
      var r = results.format(data);
      sys.puts(r);
    });
  },

  run: function () {
    
    var __core = {
      runr: this,
      data: this.runnerData,
      start: function (callback) {
        var self = this;
        var runr = this.runr;
        coll.collect((this.data.options.specdir || runr.dir()), this.data.options.filename,
            function (err, paths) {
              if(err) throw err;
              runr.readSpecs(paths, function(err, specs) {
                if(err) throw err;
                self.evaluate(specs, callback);
              });
            });
      },
      evaluate: function (specs, evalCallback) {
        for (var i = 0, ii = specs.length; i < ii; i++) {
          if (__core.data.options.verbose) {
            var num = parseInt(i) + 1;
            sys.puts(num + ". " + specs[i].path + ":\n");
          }
          evalCallback(specs[i].spec);
        }

        sys.puts("\n");
        _self.outputResults();
      }
    };
    
    var value = require("./should").value; // include should api in scope

    // =======================================
    // speks test structure
    // =======================================

    function describe(name, func) {
      this.__context__ = { name: name, specs: [] };
      __core.data.contexts.push(this.__context__);

      __core.runr.initHooks(this);

      func();

      _after();

      if (__core.data.options.verbose)
        sys.print("\n\n");
    }
   
    function it(desc, func) {
      var spec = { desc: desc };

      __core.data.total++;
      __context__.specs.push(spec);

      if (__core.data.options.verbose)
        sys.print("\n " + desc + " : ");

      if(_before) {
        _before();
        _before = null;
      }

      _beforeEach();

      try {
        func();
        __core.runr.pass();
      } catch (e) {
        __context__.hasFailures = true;
        __core.data.failCount++;
        __core.runr.fail(e);
        spec.message = e;
      }

      _afterEach();
    }
    
    // =======================================
    // speks test structure
    // =======================================
    
    function __eval(spec) {
      eval(spec);
    }
    __core.start(__eval);
  }
};
