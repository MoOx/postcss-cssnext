/**
 * Test dependencies
 */
const test = require("tape")

const utils = require("./utils")
const cssnext = require("..")
const postcss = require("postcss")

/**
 * Global API tests
 */
test("cssnext API", function(t) {
  const input = utils.readFixture("cases/example")
  const output = utils.readFixture("cases/example.expected")

  // simple API strings + options
  t.ok(
    typeof cssnext("html{}") === "string",
    "should return a string"
  )
  t.ok(
    typeof cssnext("") === "string",
    "should return a string, even if the given string is empty"
  )
  utils.compareFixtures(
    t,
    "cases/example",
    "simple example with multiples features should work with cssnext API"
  )

  // as a postcss plugin
  const postcssInstance = cssnext()
  t.ok(
    typeof postcssInstance === "object" && postcssInstance.process,
    "should return a postcss instance"
  )
  t.equal(
    postcss().use(cssnext()).process(input).css,
    output,
    "simple example with multiples features should work with postcss API"
  )

  const opts = {}
  cssnext("html{}", opts)
  t.ok(!opts.hasOwnProperty("map"), "doesn't mutate options object")

  t.end()
})
