describe("tostr", function () {
  
  var strutil = require('./strutil');
  
  it('should place double quotes around strings', function () {
    strutil.tostr('foo').shouldEqual('"foo"');
  });
  
  it('should convert undefined values into a string', function () {
    var undefined;
    strutil.tostr(undefined).shouldEqual('undefined');
  });

  it('should convert true into a string', function () {
    strutil.tostr(true).shouldEqual('true');
  });

  it('should convert false into a string', function () {
    strutil.tostr(false).shouldEqual('false');
  });

  it('should convert numbers into a string', function () {
    strutil.tostr(22).shouldEqual('22');
  });

  it('should convert null into a string', function () {
    strutil.tostr(null).shouldEqual('null');
  });

  it('should convert functions into a string', function () {
    var func = function (a, b) { return 'foo'; };
    strutil.tostr(func).shouldEqual('function (a, b) { return \'foo\'; }');
  });

});
