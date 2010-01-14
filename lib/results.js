exports.format = function (total, failed) {

  function summary() {
    var t = total + " spec" + (total != 1 ? "s" : ""),
        p = (total - failed.length) + " passed",
        f = failed.length + " failed",
        s = [t, p, f].join(", ");
  
    if (failed.length)
      return "\033[31m" + s + "\033[37m";

    return "\033[32m" + s + "\033[37m";
  }

  function failures() {
    var str = "";
    
    for (var i = 0, ii = failed.length; i < ii; i++)
      str += (i + 1) + ") " + failed[i];

    return str;
  }
  
  if(failed.length)
    return failures() + "\n" + summary();

  return summary();
};

