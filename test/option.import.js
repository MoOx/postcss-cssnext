/**
 * Test dependencies
 */
var test = require("tape")

var utils = require("./utils")
var cssnext = require("..")
var postcss = require("postcss")

test("cssnext import option", function(t) {
  var input = utils.readFixture("import")
  var expected = {
    default: utils.readFixture("import.default.expected").trim(),
    options: utils.readFixture("import.options.expected").trim()
  }
  var opts = {from: "test/fixtures/here"}
  t.equal(cssnext(input, opts).trim(), expected.default, "should be able to import")
  t.equal(cssnext(input, {from: opts.from, import: {transform: function(c) { return c + "\n new {}"}}}).trim(), expected.options, "should be able to import with options")
  t.equal(postcss().use(cssnext()).process(input, opts).css.trim(), expected.default, "should be able to import even as a postcss plugin")

  t.end()
})
