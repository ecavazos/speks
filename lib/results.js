exports.format = function (total, passed, failed) {

  function summary() {
    var t = total + ' spec' + (total != 1 ? 's' : '');
    var p = passed.length + ' passed';
    var f = failed.length + ' failed';

    return [t, p, f].join(', ');
  }

  function failures() {
    var str = '';
    
    for (var i = 0, ii = failed.length; i < ii; i++)
      str += (i + 1) + ') ' + failed[i];

    return str;
  }
  
  if(failed.length)
    return failures() + '\n' + summary();

  return summary();
};

