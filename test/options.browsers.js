var test = require("tape")

var cssnext = require("..")

test("cssnext browsers option", function(t) {
  var input = ":root{--foo:bar}baz{qux:var(--foo)}"
  var output = "baz{qux: bar}"

  t.equal(
    cssnext(input, {browsers: "Firefox >= 30"}), // fx 30 doesn't handle custom prop
    output,
    "should enable custom properties when browsers do not support it"
  )

  t.equal(
    cssnext(input, {browsers: "Firefox >= 31"}), // fx 31 handle custom prop
    input,
    "should NOT enable custom properties when browsers support it"
  )

  t.equal(
    cssnext(input, {browsers: "Firefox >= 31, IE 8"}), // fx 31 support but not IE 8
    output,
    "should enable custom properties when at least one browsers do not support it"
  )

  t.end()
})

test("cssnext browsers option propagation", function(t) {
  var input = "body{transition: 1s}"
  var output = "body{-webkit-transition: 1s;transition: 1s}"

  t.equal(
    cssnext(input, {browsers: "Safari 6"}), // Safari 6 need -webkit prefix
    output,
    "should propagate browsers option to autoprefixer"
  )

  t.equal(
    cssnext(input, {browsers: "Safari 6.1"}), // Safari 6.1 do not need -webkit prefix
    input,
    "should propagate browsers option to autoprefixer"
  )

  t.end()
})
