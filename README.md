Speks
=====

## Easily Test Your Node-Code

**Speks** is a simple specification framework and spec-runner for 
[node.js](http://nodejs.org/) code.  Speks provides a set of
**should** style prototype/extension methods to make test code more readable.  
This is also a nice extension point for
adding more sophisticated assertions in future iterations.  If you want to demo, 
you can clone the repo, *cd* into the repo and run **node speks.js** at the 
command line.

### Usage

1. Add a **spec/** directory to the root of your project.
2. Copy speks.js and the lib directory to your **spec/** directory.
3. Add some specs to your **spec/** directory: ex. example**_spec.js**
4. Run your specs with the following command: **node spec/speks.js**

### Example Spec

    describe("Sephiroth", function () {

      var s = require('../spec/examples/sephiroth');

      beforeEach(function () {
        sephiroth = new s.Sephiroth();
      });

      it("should be named 'Sephiroth'", function () {
        sephiroth.getName().shouldEqual('Sephiroth');
      });

      it("should allow name changing", function () {
        sephiroth.setName('Pedro');
        sephiroth.getName().shouldEqual('Pedro');
      });

      it("should be have an hp of 999", function () {
        sephiroth.getHp().shouldEqual(999);
      });

      it("should be have an mp of 999", function () {
        sephiroth.getMp().shouldEqual(999);
      });

    });

### Methods Of Interest
    describe("Class/Context", func)    // main spec method
    it("explain behavior", func)       // an individual spec
    before(func)                       // will run once before any specs are run
    beforeEach(func)                   // will run before every spec
    afterEach(func)                    // will run after every spec
    after(func)                        // will run after all specs and afterEach 

### Command Line Options
Verbose mode:
    node speks.js --verbose

Single file mode:
    node speks.js /path/to/example_spec.js

Different spec location:
    node speks.js --spec-dir path/to/specs/

Two options:
    node speks.js /path/to/example_spec.js --verbose

### TODO

* Make a sample app
* Create a few more should extensions
* Create an auto-running server, like autotest/autospec
