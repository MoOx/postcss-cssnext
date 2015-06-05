var test = require("tape")

var cssnext = require("..")

test("cssnext browsers option", function(t) {
  var input = ":root{--foo:bar}baz{qux:var(--foo)}"
  var output = "baz{qux: bar}"

  // fx 30 doesn't handle custom prop
  t.equal(
    cssnext(input, {browsers: "Firefox >= 30"}),
    output,
    "should enable custom properties when browsers do not support it"
  )

  // fx 31 handle custom prop
  t.equal(
    cssnext(input, {browsers: "Firefox >= 31"}),
    input,
    "should NOT enable custom properties when browsers support it"
  )

  // fx 31 support but not IE 8
  t.equal(
    cssnext(input, {browsers: "Firefox >= 31, IE 8"}),
    output,
    "should enable custom properties when at least one browsers do not " +
      "support it"
  )

  t.end()
})

test("cssnext browsers option propagation", function(t) {
  var input = "body{transition: 1s}"
  var output = "body{-webkit-transition: 1s;transition: 1s}"

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
