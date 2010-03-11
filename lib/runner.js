var path    = require("path");
var fs      = require("fs");
var op      = require("./option_parser");
var results = require("./results");
var coll    = require("./collector");
var should  = require("./should");

var Runner = exports.Runner = function () {
  this.data = {
    total: 0,
    failCount: 0,
    contexts: [],
    options: op.parse(process.ARGV)
  };
};

Runner.prototype = {

  dir: function () {
    return path.dirname(__filename).replace("lib", "") + "spec/";
  },

  initHooks: function (scope) {
    var hooks = ["before", "beforeEach", "afterEach", "after"];
    for (var i = 0, ii = hooks.length; i < ii; i++) {
      (function(name, internal) {
        scope[internal] = function () {}; // init to empty function
        scope[name] = function (func) { scope[internal] = func };
      })(hooks[i], ("__" + hooks[i]));
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
    var data = this.data;
    process.addListener("exit", function () {
      results.display(data);
    });
  },

  start: function (callback) {
    var self = this;
    coll.collect((self.data.options.specdir || self.dir()), self.data.options.filename,
        function (err, paths) {
          if(err) throw err;
          self.readSpecs(paths, function(err, specs) {
            if(err) throw err;
            self.evaluate(specs, callback);
          });
        });
  },
  
  evaluate: function (specs, evalCallback) {
    for (var i = 0, ii = specs.length; i < ii; i++)
      evalCallback(specs[i].spec);

    this.outputResults();
  },

  run: function () {
    
    // __core is intended to keep the scope in which specs will
    // be evaluated in as clean as possible.  You know, to avoid naming
    // collisions and what not.
      
    var __core = {
      runr: this,
      data: this.data
    };
    
    // include should dsl into scope
    
    var value = require("./should").value;

    // =======================================
    // speks test structure
    // =======================================

    function describe(name, func) {
      __core.context = { name: name, specs: [] };
      __core.data.contexts.push(__core.context);
      __core.runr.initHooks(this);

      func();

      __after();
    }
   
    function it(desc, func) {
      __core.spec = { desc: desc };
      __core.data.total++;
      __core.context.specs.push(__core.spec);

      if(__before) {
        __before();
        __before = null;
      }

      __beforeEach();

      try {
        func();
      } catch (e) {
        __core.context.hasFailures = true;
        __core.data.failCount++;
        __core.spec.message = e;
      }

      __afterEach();
    }
    
    // =======================================
    // speks test structure
    // =======================================
    
    function __eval(spec) {
      eval(spec);
    }
    __core.runr.start(__eval);
  }
};
