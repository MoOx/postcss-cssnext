/**
 * Test dependencies
 */
var test = require("tape")

var utils = require("./utils")
var cssnext = require("..")

/**
 * Global API tests
 */
test("cssnext", function(t) {
  t.ok(typeof cssnext("html{}") === "string", "should return a string")
  t.ok(typeof cssnext("") === "string", "should return a string, even if the given string is empty")

  var postcssInstance = cssnext()
  t.ok(typeof postcssInstance === "object" && postcssInstance.process, "should return a postcss instance")

  t.equal(
    cssnext(
      utils.read("compress/input"),
      {compress: true}
    ).trim(),
    utils.read("compress/expected").trim(),
    "should be able to compress"
  )

  t.end()
})
