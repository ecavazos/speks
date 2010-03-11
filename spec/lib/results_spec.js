describe("Results", function () {

  var results = require("./results");

  beforeEach(function () {
  });

  it("should return only the summary when the spec run contains no failures", function () {
    var actual = results.display(2, []);
    value(actual).shouldEqual("\033[32m2 specs, 2 passed, 0 failed\033[37m");
  });

  it("should you spec (singular form) when only one spec is run", function () {
    var actual = results.display(1, []);
    value(actual).shouldEqual("\033[32m1 spec, 1 passed, 0 failed\033[37m");
  });

  it("should output failure messages and summary", function () {
    var failures = ["fail msg 1", "fail msg 2"];
    var expected = "1) fail msg 12) fail msg 2\n\033[31m2 specs, 0 passed, 2 failed\033[37m";

    var actual = results.display(2, failures);
    value(actual).shouldEqual(expected);
  });

  it("should output failed and passed feedback", function () {
    var expected = "1) fail\n\033[31m2 specs, 1 passed, 1 failed\033[37m";
    var actual = results.display(2, ["fail"]);
    value(actual).shouldEqual(expected);
  });
});
