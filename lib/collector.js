var posix = require('posix');

// This function will search the spec directory recursively looking
// for files ending with "_spec.js" and add them to an array

var collect = exports.collect = function (dir, name) {
  var _promise = new process.Promise(),
      _subPromises = [],
      _specs = [],
      _interval;

  // single file mode

  if (name) {
    setTimeout(function () { _promise.emitSuccess([name]); }, 100);
    return _promise;
  }

  function doCollect(dir) {
    posix.readdir(dir).addCallback(function (files) {

      for (var i = 0, ii = files.length; i < ii; i++) {

        (function (filename) {

          var f = dir + filename;
          var promise =  posix.stat(f);

          _subPromises.push(promise);

          initInterval();

          promise.addCallback(function (stat) {
            _subPromises.pop();
            if (stat.isDirectory()) doCollect(f + '/');
            if (!filename.match(/_spec.js$/)) return;
            _specs.push(f);
          });

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
      if (_subPromises.length) return;
      clearInterval(_interval);
      _promise.emitSuccess(_specs);
    }, 100);
  }

  doCollect(dir);

  return _promise;
};
