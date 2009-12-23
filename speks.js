 
(function() {

  var Speks = exports.Speks = {};

  process.mixin(require('sys'));
  
  process.mixin(
    Speks,
    require('./stringer'),
    require('./equal'),
    require('./options'),
    require('./results'),
    require('./runner')
  );

  process.mixin(require('./should'));
  
  Speks.zee = 'blah!';
  Speks.Runner.run();
  

})();
