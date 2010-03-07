describe('Bool', function () {

  it('should be true', function () {
    value(true).shouldBeTrue();
  });

  it('should evaluate to true', function () {
    value(1 == 1).shouldBeTrue();
  });

  it('should be false', function () {
    value(false).shouldBeFalse();
  });
    
  it('should evaluate to false', function () {
    value(1 == 2).shouldBeFalse();
  });

});
