 
(function() {
  
  process.mixin(require('sys'));
  process.mixin(require('./stringer'));
  process.mixin(require('./equal'));  
  process.mixin(require('./should'));
  process.mixin(require('./options'));
  process.mixin(require('./results'));
  process.mixin(require('./runner'));

  Runner.run();

})();
