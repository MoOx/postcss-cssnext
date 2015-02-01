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
    from: "./test/fixtures/sourcemap.css",
    sourcemap: true
  }
  t.equal(
    cssnext(
      utils.readFixture("sourcemap"),
      options
    ),
    utils.readFixture("sourcemap.expected").trim(),
    "should contain a correct inlined sourcemap"
  )

  var result = cssnext(
    utils.readFixture("sourcemap"),
    {
      from: "./test/fixtures/sourcemap.css",
      map: {inline: false}
    }
  )

  t.equal(
    result.map.toString(),
    utils.readFixture("sourcemap.expected", ".map").trim(),
    "should contain a correct sourcemap"
  )

  t.end()
})
