/**
 * Test dependencies
 */
var test = require("tape")

var utils = require("./utils")
var cssnext = require("..")
var postcss = require("postcss")

/**
 * Global API tests
 */
test("cssnext API", function(t) {
  var input = utils.read("cases/example")
  var output = utils.read("cases/example.expected").trim()

  // simple API strings + options
  t.ok(typeof cssnext("html{}") === "string", "should return a string")
  t.ok(typeof cssnext("") === "string", "should return a string, even if the given string is empty")
  t.equal(cssnext(input).trim(), output, "simple example with multiples features should work with cssnext API")

  // as a postcss plugin
  var postcssInstance = cssnext()
  t.ok(typeof postcssInstance === "object" && postcssInstance.process, "should return a postcss instance")
  t.equal(postcss().use(cssnext()).process(input).css.trim(), output, "simple example with multiples features should work with postcss API")

  t.end()
})

test("cssnext compress option", function(t) {
  var input = utils.read("compress/input")
  var output = utils.read("compress/expected").trim()
  var opts = {compress: true}

  // compress option
  t.equal(cssnext(input, opts).trim(), output, "should be able to compress")
  t.equal(postcss().use(cssnext(opts)).process(input, opts).css.trim(), output, "should be able to compress even as a postcss plugin")

  t.end()
})
