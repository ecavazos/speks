describe('Array', function() {

  beforeEach(function() {
    _ar1 = [1,2,3];
    _ar2 = [1,2,3];
  });

  it('should equal another array of the same value', function() {
    _ar1.shouldEqual(_ar2);
  });

  it('should not equal another array of different value', function() {
    _ar1[0] = 2;
    _ar1.shouldNotEqual(_ar2);
  });

  it('should be identical', function() {
    _ar1.shouldBeSame(_ar1);
  });

  it('should not be identical', function() {
    _ar1.shouldNotBeSame(_ar2);
  });

  it('should equal another array of the same value when array contains custom objects', function() {
    var cloud = new require('../spec/cloud').Cloud();
    _ar1.push(cloud);
    _ar2.push(cloud);
    _ar1.shouldEqual(_ar2);
  });
});
