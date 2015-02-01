var test = require("tape")

var utils = require("./utils")
var cssnext = require("..")
var postcss = require("postcss")
var assign = require("object-assign")

test("cssnext url option", function(t) {
  var input = utils.readFixture("url")
  var expected = {
    default: utils.readFixture("url.default.expected").trim(),
    options: utils.readFixture("url.options.expected").trim()
  }
  var opts = {from: "./test/fixtures/url.css"}

  t.equal(cssnext(input,opts).trim(), expected.default, "should be able to adjust url")
  t.equal(cssnext(input, assign({}, opts, {url: {url: "inline"}})).trim(), expected.options, "should be able to adjust url with options")
  t.equal(postcss().use(cssnext(opts)).process(input, opts).css.trim(), expected.default, "should be able to adjust url even as a postcss plugin")

  t.end()
})
