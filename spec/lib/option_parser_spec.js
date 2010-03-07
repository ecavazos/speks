describe("Option Parser", function () {
    
  var opts = require("./option_parser");

  it("should leave the verbose property null when the verbose flag is not provided", function () {
    value(opts.parse([]).verbose == null).shouldBeTrue();
  });

  it("should parse verbose flag", function () {
    var actual = opts.parse(["foo", "bar", "--verbose"]).verbose;
    value(actual).shouldEqual("--verbose");
  });

  it("should leave the filename property null when no filename is provided", function () {
    value(opts.parse([]).filename == null).shouldBeTrue();
  });

  it("should parse filename when filename ends with '_spec.js'", function () {
    var actual = opts.parse(["bar", "fake_spec.js", "foo"]).filename; 
    value(actual).shouldEqual("fake_spec.js");
  });
  
});
