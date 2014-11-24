/**
 * Test dependencies
 */
var test = require("tape")

var utils = require("./utils")
var cssnext = require("..")

/**
 * Sourcemap tests
 */
test("sourcemap", function(t) {
  var options = {
    from: "./test/sourcemap/input.css",
    sourcemap:  true
  }
  t.equal(
    cssnext(
      utils.read("sourcemap/input"),
      options
    ).trim(),
    utils.read("sourcemap/expected-inline").trim(),
    "should contain a correct inlined sourcemap"
  )

  t.ok(!options.hasOwnProperty("map"), "doesn't mutate options object")

  var result = cssnext(
    utils.read("sourcemap/input"),
    {
      from: "./test/sourcemap/input.css",
      map: {inline: false}
    }
  )

  t.equal(
    result.map.toString(),
    utils.read("sourcemap/expected", ".map").trim(),
    "should contain a correct sourcemap"
  )

  t.end()
})
