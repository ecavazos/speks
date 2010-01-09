var sys = require('sys');

var Speks = {

  version: '0.1.0',

  run: function () {
    var runr = require('./lib/runner');
    var r = new runr.Runner();

    try { 
      r.run(); 
    }
    catch (e) { 
      sys.puts('\n' + e); 
    }
  }

};

Speks.run();
