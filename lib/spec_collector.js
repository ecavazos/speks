var posix = require('posix');

// This function will search the spec directory recursively looking
// for files ending with "_spec.js" and add them to an array

var collect = exports.collect = function(dir, name) {

  var _promise = new process.Promise();
  var _subPromises = [];
  var _specs = [];

  if(name) {
    setTimeout(function() { _promise.emitSuccess([name]); }, 100);
    return _promise;
  }

  function doCollect(dir) {
    posix.readdir(dir).addCallback(function(files) {
      for(var i = 0, ii = files.length; i < ii; i++) {

        (function(filename) {

          var promise =  posix.stat(dir + filename);

          _subPromises[filename] = promise;

          promise.addCallback(function(stat) {
            delete _subPromises[filename];

            if(stat.isDirectory()) doCollect(dir + filename + '/');

            if(!filename.match(/_spec.js$/)) return;

            _specs.push(dir + filename);
          });

        })(files[i]);
      }

      // make sure all sub-promises have been handled
      // successfully before emitting success on the main
      // promise
      setInterval(function() {
        if(_subPromises.length) return;
        clearInterval(this);
        _promise.emitSuccess(_specs);
      }, 200);

    });
  }

  doCollect(dir);

  return _promise;
};
