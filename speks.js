var  Speks = {

  version: '0.0.1',

  run: function() {
    var runr = require('./lib/runner');
    var r = new runr.Runner();
    r.run();
  }

};

Speks.run();
