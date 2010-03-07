describe("String", function () {
  
  it("should equal another string of the same value", function () {
    value("foo").shouldEqual("foo");
  });
 
  it("should not equal another string of different value", function () {
    value("foo").shouldNotEqual("bar");
  });

  it("should equal another string object of the same value", function () {
    value(new String("foo")).shouldEqual("foo");
  });

  it("should be identical", function () {
    var a = "foo";
    value(a).shouldBeSame(a);
  });

  it("should not be identical", function () {
    value("foo").shouldBeSame("foo");
  });

  it("should match 'abc'", function () {
    value("I just learned my ABCs.").shouldMatch(/abc/i);
  });

  it("should not match 'not'", function () {
    value("Maybe not").shouldNotMatch(/NOT/);
  });
});
