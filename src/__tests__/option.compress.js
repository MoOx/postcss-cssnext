/**
 * Test dependencies
 */
const test = require("tape")

const utils = require("./utils")
const cssnext = require("..")
const postcss = require("postcss")

test("cssnext compress option", function(t) {
  const input = utils.readFixture("compress")
  const expected = {
    default: utils.readFixture("compress.default.expected").trim(),
    options: utils.readFixture("compress.options.expected").trim(),
  }

  // compress option
  t.equal(
    cssnext(input, {compress: true}).trim(),
    expected.default,
    "should be able to compress"
  )
  t.equal(
    cssnext(input, {compress: {comments: {removeAll: true}}}).trim(),
    expected.options,
    "should be able to compress with options"
  )
  t.equal(
    postcss().use(cssnext({compress: true})).process(input).css.trim(),
    expected.default,
    "should be able to compress even as a postcss plugin"
  )

  t.end()
})
