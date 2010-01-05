describe("Option Parser", function () {
    
  var opts = require("./option_parser");

  it("should leave the verbose property null when the verbose flag is not provided", function () {
    (opts.parse([]).verbose == null).shouldBeTrue();
  });

  it("should parse verbose flag", function () {
    opts.parse(["foo", "bar", "--verbose"]).verbose.shouldEqual("--verbose");
  });

  it("should leave the filename property null when no filename is provided", function () {
    (opts.parse([]).filename == null).shouldBeTrue();
  });

  it("should parse filename when filename ends with '_spec.js'", function () {
    opts.parse(["bar", "fake_spec.js", "foo"]).filename.shouldEqual("fake_spec.js");
  });
  
});
