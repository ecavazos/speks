describe('Object', function () {

  beforeEach(function () {
    // do something
  });

  afterEach(function () {
    // do something
  });

  it('should assert equality of objects', function () {
    var obj1 = function () {
      this.foo = function () { return 'foo'; }
      this.bar = function () { return 'bar'; }
    };

    value(new obj1()).shouldEqual(new obj1());
  });
  
  it('should assert inequality of objects', function () {
    var obj1 = function () {
      this.foo = function () { return 'foo'; }
    };

    var obj2 = function () {
      this.bar = function () { return 'bar'; }
    };

    value(obj1).shouldEqual(obj2);
  });

  it('should assert objects are the same', function () {
    var obj1 = function () {
      this.f1 = function () { return 'foo'; }
      this.f2 = function () { return 'bar'; }
    };

    var a = new obj1();

    value(a).shouldBeSame(a);
    value(obj1).shouldBeSame(obj1);
  });
  
  it('should assert objects are not the same', function () {
    var a = new Object();
    var b = new Object();

    value(a).shouldNotBeSame(b);
  });

});
