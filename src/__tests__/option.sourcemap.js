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

  var result = cssnext(
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
