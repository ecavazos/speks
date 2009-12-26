Speks
=====

## Easily Test Your Node-Code

**Speks** is a simple specification framework and spec-runner for node.js code.

### Usage

1. Add a **spec/** directory to the root of your project.
2. Copy speks.js and the lib directory to your **spec/** directory.
3. Add some specs to your **spec/** directory: ex. example_spec.js
  * note: the "_spec.js" portion of the name is a required convention
4. Run your specs with the following command: **node spec/speks.js**

### Example Spec

One thing to notice is the use of require in this example.  I was unable to make node.js require a module that was up a directory.
As a hack, I modified request.paths so you can require files in your project and node will search for them.  You can find more
examples in the spec directory.

    describe("Sephiroth", function() {

      var s = require("sephiroth");
      var sephiroth;

      beforeEach(function() {
        sephiroth = new s.Sephiroth();
      });

      it("should be named 'Sephiroth'", function() {
        sephiroth.getName().shouldEqual('Sephiroth');
      });

      it("should allow name changing", function() {
        sephiroth.setName('Pedro');
        sephiroth.getName().shouldEqual('Pedro');
      });

      it("should be have an hp of 999", function() {
        sephiroth.getHp().shouldEqual(999);
      });

      it("should be have an mp of 999", function() {
        sephiroth.getMp().shouldEqual(999);
      });
      
    });

### TODO

* Make a sample app
* Create a few more should extensions
* Create an auto-running server, like autotest/autospec
