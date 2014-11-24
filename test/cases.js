/**
 * Test dependencies
 */
var test = require("tape")

var utils = require("./utils")
var cssnext = require("..")

/**
 * Use cases test
 */
test("use case: color plugins together", function(t) {
  t.equal(
    cssnext(
      utils.read("cases/color"),
      {}
    ).trim(),
    utils.read("cases/color.expected").trim(),
    "all color plugins should works together"
  )

  t.end()
})

test("use case: use plugin options", function(t) {
  t.equal(
    cssnext(
      utils.read("cases/plugin-options"),
      {
        features: {
          customProperties: {
            preserve: true
          }
        }
      }
    ).trim(),
    utils.read("cases/plugin-options.expected").trim(),
    "should be able to pass options to plugins"
  )

  t.end()
})
