exports.display = function (runrData) {
  
  var sys = arguments[1] || require("sys");
  
  function fail () {
    var f = runrData.options.verbose ? "Fail " : "F";
    sys.print("\033[31m" + f + "\033[37m");
  }

  function pass () {
    var p = runrData.options.verbose ? "Pass " : ".";
    sys.print("\033[32m" + p + "\033[37m");
  }

  function format(msg) {
    var nl = "\n\n";
    return nl + msg + nl;
  }

  function summary() {
    var total = runrData.total + " spec" + (runrData.total != 1 ? "s" : ""),
        passed = (runrData.total - runrData.failCount) + " passed",
        failed = runrData.failCount + " failed",
        s = [total, passed, failed].join(", ");
  
    if (runrData.failCount > 0) {
      s = "\033[31m" + s + "\033[37m";
    } else {
      s = "\033[32m" + s + "\033[37m";
    }
    sys.puts(s);
  }

  function details() {
    for (var i = 0, ii = runrData.contexts.length; i < ii; i++) {
      var c = runrData.contexts[i];
      if (c.hasFailures || runrData.options.verbose) {
        sys.puts("\n" + c.name + ":\n");
      } else {
        continue;
      }

      for (var j = 0, jj = c.specs.length; j < jj; j++) {
        if (!c.specs[j].message && !runrData.options.verbose) continue;
        
        sys.print("  " + (j + 1) + ". " + c.specs[j].desc + "\n");
        
        if (c.specs[j].message)
          sys.puts("\n" + c.specs[j].message + "\n");
      }
    }
    sys.puts("\n");
  }
  
  function timeline () {
    for (var i = 0, ii = runrData.contexts.length; i < ii; i++) {
      var c = runrData.contexts[i];

      for (var j = 0, jj = c.specs.length; j < jj; j++) {
        if (c.specs[j].message) {
          fail();
        } else {
          pass();
        }
      }
    }
    sys.print("\n");
  }
  
  // output results
  
  timeline();
  details();
  summary();
};

