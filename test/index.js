var test = require("tape")

var cssnext = require("..")

test("cssnext", function(t) {
  t.ok(typeof cssnext("html{}") === "string", "should return a string")

  t.end()
})
