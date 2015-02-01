/**
 * Test dependencies
 */
var test = require("tape")

var utils = require("./utils")
var cssnext = require("..")
var postcss = require("postcss")

test("cssnext compress option", function(t) {
  var input = utils.readFixture("compress")
  var expected = {
    default: utils.readFixture("compress.default.expected").trim(),
    options: utils.readFixture("compress.options.expected").trim()
  }

  // compress option
  t.equal(cssnext(input, {compress: true}).trim(), expected.default, "should be able to compress")
  t.equal(cssnext(input, {compress: {removeAllComments: true}}).trim(), expected.options, "should be able to compress with options")
  t.equal(postcss().use(cssnext({compress: true})).process(input).css.trim(), expected.default, "should be able to compress even as a postcss plugin")

  t.end()
})
