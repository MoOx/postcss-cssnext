/**
 * Test dependencies
 */
const test = require("tape")

const utils = require("./utils")
const cssnext = require("..")

/**
 * Sourcemap tests
 */
test("sourcemap", function(t) {
  const options = {
    from: "./src/__tests__/fixtures/sourcemap.css",
    sourcemap: true,
  }
  t.ok(
    cssnext(
      utils.readFixture("sourcemap"),
      options
    )
      .indexOf("/*# sourceMappingURL=data:application/json;base64,")
      > -1,
    "should contain a correct inlined sourcemap"
  )

  const result = cssnext(
    utils.readFixture("sourcemap"),
    {
      from: "./src/__tests__/fixtures/sourcemap.css",
      map: {inline: false},
    }
  )

  t.ok(
    /* eslint-disable max-len */
    result.map.toString()
      .indexOf(utils.readFixture("sourcemap.expected-start", "").trim())
      > -1
    ,
    /* eslint-enable max-len */
    "should contain a correct sourcemap"
  )

  t.end()
})
