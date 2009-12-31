describe('Bool', function () {

  it('should be true', function () {
    true.shouldBeTrue();
  });

  it('should evaluate to true', function () {
    (1 == 1).shouldBeTrue();
  });

  it('should be false', function () {
    false.shouldBeFalse();
  });
    
  it('should evaluate to false', function () {
    (1 == 2).shouldBeFalse();
  });

});
