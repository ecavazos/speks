var sys = require('sys');

exports.out = function (total, passed, failed) {

  function summary() {
    var t = total + ' spec' + (total != 1 ? 's' : '');
    var p = passed.length + ' passed';
    var f = failed.length + ' failed';

    return [t, p, f].join(', ') + '\n';
  }

  function failures() {
    if (!failed.length) return '';

    var str = '';
    
    for (var i = 0, ii = failed.length; i < ii; i++)
      str += (i + 1) + ') ' + failed[i];

    return str;
  }
  
  sys.puts(failures());
  sys.puts(summary());
};

