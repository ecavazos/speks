describe('Number', function () {
  //equal = function () {return false;}

  it('should equal another number of the same value', function () {
    (32).shouldEqual(32);
  });

  it('(primitive) should equal another number object of the same value', function () {
    (32).shouldEqual(new Number(32));
  });

  it('(object) should equal another number object of the same value', function () {
    (new Number(32)).shouldEqual(new Number(32));
  });

  it('should not equal a number of a different value', function () {
    (32).shouldNotEqual(-32);
  });

  it('(object) should not equal a number object of a different value', function () {
    new Number(32).shouldNotEqual(new Number(-32));
  });

  it('should be the same as another number of the same value', function () {
    var a = 1, b = 1;
    a.shouldBeSame(b);
  });

  it('(primitive) should not be the same as a number object of the same value', function () {
     var a = 1, b = new Number(1);
     a.shouldNotBeSame(b);
  });

  it('(object) should not be the same as a number object of the same value', function () {
     var a = new Number(1), b = new Number(1);
     a.shouldNotBeSame(b);
  });

  it('should be greater than 2', function () {
     (3).shouldBeGreaterThan(2);
  });

  it('should be less than 2', function () {
     (-2).shouldBeLessThan(2);
  });

});
