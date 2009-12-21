var c = require("./spec/cloud");

describe("Cloud", function() {

  var cloud = c.cloud;

  it("should be named 'Cloud'", function() {
    cloud.name().shouldEqual('Cloud');
  });

  it('should assert equality of objects', function() {
    var obj1 = function() {
      this.foo = 'foo';
      this.bar = function() { return 'bar'; };
    };

    var obj2 = function() {
      this.foo = 'foo';
      this.bar = function() { return 'bar'; };
    };

    var a = new obj1();

    a.shouldEqual(a);
  });
});
