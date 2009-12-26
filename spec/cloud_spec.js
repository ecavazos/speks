describe("Cloud", function() {
  
  //var c = require(process.cwd() + "/spec/cloud");
  var c = require('cloud');
      cloud = {};

  beforeEach(function() {
    cloud = c.cloud;
  });


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
