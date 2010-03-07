describe("Cloud", function () {
 
  // you can also require modules like so:
  // var c = require(process.cwd() + "/spec/cloud");

  var c = require('../spec/examples/cloud');

  beforeEach(function () {
    cloud = new c.Cloud();
  });

  it("should be named 'Cloud'", function () {
    value(cloud.getName()).shouldEqual('Cloud');
  });

  it("should allow name changing", function () {
    cloud.setName('Rain-Cloud');
    value(cloud.getName()).shouldEqual('Rain-Cloud');
  });

  it("should be have an hp of 99", function () {
    value(cloud.getHp()).shouldEqual(99);
  });

  it("should be have an mp of 77", function () {
    value(cloud.getMp()).shouldEqual(77);
  });
});
