exports.format = function (runrData) {

  function format(msg) {
    var nl = "\n\n";
    return nl + msg + nl;
  }

  function summary() {
    var t = runrData.total + " spec" + (runrData.total != 1 ? "s" : ""),
        p = (runrData.total - runrData.failCount) + " passed",
        f = runrData.failCount + " failed",
        s = [t, p, f].join(", ");
  
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
        if (c.specs[j].message)
          str += (j + 1) + ") "
            + c.specs[j].desc
            + format(c.specs[j].message);
      }
    }

    return str;
  }
  
  if(runrData.failCount > 0)
    return failures() + "\n" + summary();

  return summary();
};

