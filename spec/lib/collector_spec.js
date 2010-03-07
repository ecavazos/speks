describe("Collector", function () {

  var collector = require("./collector");

  before(function () {
  });

  it("should invoke callback with a single element array when a filename is provided", function () {
    collector.collect("", "fake_spec.js", function (err, paths) {
      value(paths).shouldEqual(["fake_spec.js"]);
    });

  });

  after(function() {
  });
});
