Options = {

  init: function() {
      var parseFileName = function(argv) {
        var exp = /,.[^,]+_spec.js/;
        
        if(argv.toString().match(exp))
          return exp.exec(argv)[0];

        return null;
      }

      this.verbose = process.ARGV.join(';').match(/;--verbose/);
      this.fileName = parseFileName(process.ARGV); // command line option to run a single file: ex. test_spec.js
  }

};

