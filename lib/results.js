exports.format = function (runrData) {

  function fail () {
    var f = runrData.options.verbose ? "Fail " : "F";
    return "\033[31m" + f + "\033[37m";
  }

  function pass () {
    var p = runrData.options.verbose ? "Pass " : ".";
    return "\033[32m" + p + "\033[37m";
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
  
    if (runrData.failCount > 0)
      return "\033[31m" + s + "\033[37m";

    return "\033[32m" + s + "\033[37m";
  }

  function failures() {
    var str = "";

    for (var i = 0, ii = runrData.contexts.length; i < ii; i++) {
      var c = runrData.contexts[i];
      if (c.hasFailures || runrData.options.verbose) {
        str += c.name + ":\n\n"
      } else {
        continue;
      }

      for (var j = 0, jj = c.specs.length; j < jj; j++) {
        str += (j + 1) + ") ";
        if (c.specs[j].message) {
          str += c.specs[j].desc + format(c.specs[j].message);
        } else if (runrData.options.verbose) {
          str += c.specs[j].desc + "\n";
        }
      }
    }

    return str;
  }
  
  function timeline () {
    var str = ""
    for (var i = 0, ii = runrData.contexts.length; i < ii; i++) {
      var c = runrData.contexts[i];

      for (var j = 0, jj = c.specs.length; j < jj; j++) {
        if (c.specs[j].message) {
          str += fail();
        } else {
          str += pass();
        }
      }
    }
    return str;
  }
  
  // output results
  
  var output = timeline() + "\n\n";
  
  if(runrData.failCount > 0)
    output += failures() + "\n";

  return output + summary();
};

