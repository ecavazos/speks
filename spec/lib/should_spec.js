describe("Should", function () {
  
  var value = require("./should").value;

  it("should not throw when shouldEqual passes", function () {
    value(function () {
      ({}).shouldEqual({});
    }).shouldNotThrow();
  });

  it("should throw when shouldEqual fails", function () {
    value(function() {
      ({}).shouldEqual({ bar: "bar" });
    })
    .shouldThrow()
    .exception('Expected:\n{ bar: "bar" }\n\nActual:\n{  }');
  });
});
