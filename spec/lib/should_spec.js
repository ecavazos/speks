describe("Should", function () {
  
  var value = require("./should").value;

  it("should not throw when shouldEqual passes", function () {
    value(function () {
      value({}).shouldEqual({});
    }).shouldNotThrow();
  });

  it("should throw when shouldEqual fails", function () {
    value(function () {
      value({}).shouldEqual({ bar: "bar" });
    })
    .shouldThrow()
    .exception('Expected:\n{ bar: "bar" }\n\nActual:\n{}');
  });

  it("should not throw when shouldNotEqual passes", function () {
    value(function () {
      value({}).shouldNotEqual({ bar: "bar" });
    })
    .shouldNotThrow();
  });

  it("should throw when shouldNotEqual fails", function () {
    value(function () {
      value({}).shouldNotEqual({});
    })
    .shouldThrow()
    .exception("Expected:\n{}\n\nActual:\n{}");
  });

  it("should not throw when shouldBeSame passes", function () {
    value(function () {
      var foo = 1;
      value(foo).shouldBeSame(foo);
    })
    .shouldNotThrow();
  });

  it("should throw when shouldBeSame fails", function () {
    value(function () {
      value({}).shouldBeSame({});
    })
    .shouldThrow()
    .exception("Expected {} to be the same as {}");
  });

  it("should not throw when shouldNotBeSame passes", function () {
    value(function () {
      value({}).shouldNotBeSame({});
    })
    .shouldNotThrow();
  });

  it("should throw when shouldNotBeSame fails", function () {
    value(function () {
      var foo = 1;
      value(foo).shouldNotBeSame(foo);
    })
    .shouldThrow()
    .exception("Expected 1 to not be the same as 1");
  });
});
