const test = require("tape")

const cssnext = require("..")

test("cssnext browsers option", function(t) {

  // no recent browser need pixrem
  const remInput = "body{font-size:2rem}"
  t.equal(
    cssnext(
      remInput,
      {browsers: "last 1 version"}
    ),
    remInput,
    "should not enable px fallback when all browsers support it"
  )

  const customPropsInput = ":root{--foo:bar}baz{qux:var(--foo)}"
  const customPropsOutput = "baz{qux: bar}"

  // fx 30 doesn't handle custom prop
  t.equal(
    cssnext(customPropsInput, {browsers: "Firefox >= 30"}),
    customPropsOutput,
    "should enable custom properties when browsers do not support it"
  )

  // fx 31 handle custom prop
  t.equal(
    cssnext(customPropsInput, {browsers: "Firefox >= 31"}),
    customPropsInput,
    "should NOT enable custom properties when browsers support it"
  )

  // fx 31 support but not IE 8
  t.equal(
    cssnext(customPropsInput, {browsers: "Firefox >= 31, IE 8"}),
    customPropsOutput,
    "should enable custom properties when at least one browsers do not " +
      "support it"
  )

  t.end()
})

test("cssnext browsers option propagation", function(t) {
  const input = "body{transition: 1s}"
  const output = "body{-webkit-transition: 1s;transition: 1s}"

  // Safari 6 need -webkit prefix
  t.equal(
    cssnext(input, {browsers: "Safari 6"}),
    output,
    "should propagate browsers option to autoprefixer"
  )

  // Safari 6.1 do not need -webkit prefix
  t.equal(
    cssnext(input, {browsers: "Safari 6.1"}),
    input,
    "should propagate browsers option to autoprefixer"
  )

  t.end()
})
