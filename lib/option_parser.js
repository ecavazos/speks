exports.parse = function (argv) {
  
  // command line option to search an alternate directory for spec files
  // ex. node speks.js --spec-dir some/where/else
  function specDir() {
    var regex = /--spec-dir,+([^,]+)/, // XXX Assumes no spaces in path
        match = argv.toString().match(regex);
    
    if (match && match[1])
      return match[1];
    
    return null;
  }
  
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
    filename: parseFilename(),
    specdir: specDir()
  };

};

