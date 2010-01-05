exports.parse = function (argv) {

  // command line option to run a single file:
  // ex. node speks.js test_spec.js
  function parseFilename() { 
    var exp = /,.[^,]+_spec.js/;
    
    if (argv.toString().match(exp))
      return exp.exec(argv)[0].substr(1); // remove leading comma: ex. ,test_spec.js to test_spec.js

    return null;
  }

  // command line option to run specs in verbose mode:
  // ex. node speks.js --verbose
  function parseVerbose() {
    return argv.toString().match(/--verbose/);
  }

  return {
    verbose: parseVerbose(),
    filename: parseFilename()
  };

};

