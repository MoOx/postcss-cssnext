const test = require("tape")

const utils = require("./utils")
const cssnext = require("..")
const postcss = require("postcss")

test("cssnext url option", function(t) {
  const input = utils.readFixture("url")
  const expected = {
    default: utils.readFixture("url.default.expected").trim(),
    options: utils.readFixture("url.options.expected").trim(),
  }
  const opts = {from: "./src/__tests__/fixtures/url.css"}

  t.equal(
    cssnext(input, opts).trim(),
    expected.default,
    "should be able to adjust url"
  )
  t.equal(
    cssnext(input, {...opts, url: {url: "inline"}}).trim(),
    expected.options,
    "should be able to adjust url with options"
  )
  t.equal(
    postcss().use(cssnext(opts)).process(input, opts).css.trim(),
    expected.default,
    "should be able to adjust url even as a postcss plugin"
  )

  t.end()
})
