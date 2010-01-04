describe("Results", function () {

  var results = require("./results");

  beforeEach(function () {
  });

  it("should return only the summary when the spec run contains no failures", function () {
    results.format(2, ["yeah", "woot"], []).shouldEqual("2 specs, 2 passed, 0 failed");
  });

  it("should you spec (singular form) when only one spec is run", function () {
    results.format(1, ["foo"], []).shouldEqual("1 spec, 1 passed, 0 failed");
  });
});
