var s = require("sephiroth");

describe("Sephiroth", function() {

  var sephiroth;

  beforeEach(function() {
    sephiroth = new s.sephiroth();
  });

  it("should be named 'Sephiroth'", function() {
    sephiroth.name().shouldEqual('Sephiroth');
  });

  it("should be have an hp of 999", function() {
    sephiroth.hp().shouldEqual(999);
  });
});
