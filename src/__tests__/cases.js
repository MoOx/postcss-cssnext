/**
 * Test dependencies
 */
const test = require("tape")

const utils = require("./utils")
const cssnext = require("..")

/**
 * Use cases test
 */
test("use case: color plugins together", function(t) {
  t.equal(
    cssnext(
      utils.readFixture("cases/color"),
      {}
    ),
    utils.readFixture("cases/color.expected"),
    "all color plugins should works together"
  )

  t.end()
})

test("use case: use plugin options", function(t) {
  t.equal(
    cssnext(
      utils.readFixture("cases/plugin-options"),
      {
        features: {
          customProperties: {
            preserve: true,
          },
        },
      }
    ),
    utils.readFixture("cases/plugin-options.expected"),
    "should be able to pass options to plugins"
  )

  t.end()
})
