describe("Results", function () {

  var results = require("./results");

  beforeEach(function () {
  });

  it("should return only the summary when the spec run contains no failures", function () {
    results.format(2, []).shouldEqual("2 specs, 2 passed, 0 failed");
  });

  it("should you spec (singular form) when only one spec is run", function () {
    results.format(1, []).shouldEqual("1 spec, 1 passed, 0 failed");
  });

  it("should output failure messages and summary", function () {
    var failures = ["fail msg 1", "fail msg 2"];
    var expected = "1) fail msg 12) fail msg 2\n2 specs, 0 passed, 2 failed";

    results.format(2, failures).shouldEqual(expected);
  });

  it("should output failed and passed feedback", function () {
    var expected = "1) fail\n2 specs, 1 passed, 1 failed";

    results.format(2, ["fail"]).shouldEqual(expected);
  });
});
