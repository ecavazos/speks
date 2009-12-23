Options = {

  parse: function(argv) {

    // command line option to run a single file:
    // ex. node speks.js test_spec.js
    function _filename() { 
      var exp = /,.[^,]+_spec.js/;
      
      if(argv.toString().match(exp))
        return exp.exec(argv)[0].substr(1); // remove leading comma: ex. ,test_spec.js to test_spec.js

      return null;
    }

    // command line option to run specs in verbose mode:
    // ex. node speks.js --verbose
    function _verbose() {
      return argv.join(';').match(/;--verbose/);
    }

    return {
      verbose: _verbose(),
      filename: _filename()
    };
  }

};

