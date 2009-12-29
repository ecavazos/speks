describe("Sephiroth", function() {

  var s = require('../spec/sephiroth');

  beforeEach(function() {
    sephiroth = new s.Sephiroth();
  });

  it("should be named 'Sephiroth'", function() {
    sephiroth.getName().shouldEqual('Sephiroth');
  });

  it("should allow name changing", function() {
    sephiroth.setName('Pedro');
    sephiroth.getName().shouldEqual('Pedro');
  });

  it("should be have an hp of 999", function() {
    sephiroth.getHp().shouldEqual(999);
  });

  it("should be have an mp of 999", function() {
    sephiroth.getMp().shouldEqual(999);
  });
  
});
