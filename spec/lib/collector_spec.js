describe("Collector", function () {

  var collector = require("./collector");

  before(function () {
  });

  it("should invoke callback with a single element array when a filename is provided", function () {
    var callCount = 0

    collector.collect("", "fake_spec.js", function (err, paths) {
      callCount++;
      value(paths).shouldEqual(["fake_spec.js"]);
    });

    value(callCount).shouldEqual(1);

  });

  after(function() {
  });
});
