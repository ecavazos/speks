describe("Sephiroth", function () {

  var s = require('../spec/examples/sephiroth');

  beforeEach(function () {
    sephiroth = new s.Sephiroth();
  });

  it("should be named 'Sephiroth'", function () {
    value(sephiroth.getName()).shouldEqual('Sephiroth');
  });

  it("should allow name changing", function () {
    sephiroth.setName('Pedro');
    value(sephiroth.getName()).shouldEqual('Pedro');
  });

  it("should be have an hp of 999", function () {
    value(sephiroth.getHp()).shouldEqual(999);
  });

  it("should be have an mp of 999", function () {
    value(sephiroth.getMp()).shouldEqual(999);
  });
  
});
