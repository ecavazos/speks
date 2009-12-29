describe("Cloud", function() {
 
  // you can also require modules like so:
  // var c = require(process.cwd() + "/spec/cloud");

  var c = require('../spec/cloud');

  beforeEach(function() {
    cloud = new c.Cloud();
  });

  it("should be named 'Cloud'", function() {
    cloud.getName().shouldEqual('Cloud');
  });

  it("should allow name changing", function() {
    cloud.setName('Rain-Cloud');
    cloud.getName().shouldEqual('Rain-Cloud');
  });

  it("should be have an hp of 99", function() {
    cloud.getHp().shouldEqual(99);
  });

  it("should be have an mp of 77", function() {
    cloud.getMp().shouldEqual(77);
  });
});
