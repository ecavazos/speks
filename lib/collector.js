var fs = require('fs');

// This function will search the spec directory recursively looking
// for files ending with "_spec.js" and add them to an array

var collect = exports.collect = function (dir, name, callback) {
  var _pending = 0,
      _specs = [],
      _interval;

  // single file mode

  if (name)
    setTimeout(function () { callback(null, [name]); }, 100);

  function doCollect(dir) {
    fs.readdir(dir, function (err, files) {
      if(err) {
        callback(err);
        return;
      }

      for (var i = 0, ii = files.length; i < ii; i++) {

        (function (filename) {

          var f = dir + filename;
          _pending++;

          fs.stat(f, function(err, stats) {
            if(err) {
              callback(err);
              return;
            }
            _pending--;
            if (stats.isDirectory()) doCollect(f + '/');
            if (!filename.match(/_spec.js$/)) return;
            _specs.push(f);
          });

          initInterval();

        })(files[i]);
      }

    });
  }

  // make sure all sub-promises have been handled
  // successfully before emitting success on the main
  // promise

  function initInterval() {
    if (_interval) return;

    _interval = setInterval(function () {
      if (_pending > 0) return;
      clearInterval(_interval);
      callback(null, _specs);
    }, 100);
  }

  doCollect(dir);
};
