describe('String', function () {
  
  it('should equal another string of the same value', function() {
    'foo'.shouldEqual('foo');
  });
 
  it('should not equal another string of different value', function() {
    'foo'.shouldNotEqual('bar');
  });

  it('should equal another string object of the same value', function() {
    new String('foo').shouldEqual('foo');
  });

  it('should be identical', function() {
    var a = 'foo';
    a.shouldBeSame(a);
  });

  it('should not be identical', function() {
    'foo'.shouldBeSame('foo');
  });

  it('should match "abc"', function() {
    'I just learned my ABCs.'.shouldMatch(/abc/i);
  });

  it('should not match "not"', function() {
    'Maybe not'.shouldNotMatch(/NOT/);
  });
});
