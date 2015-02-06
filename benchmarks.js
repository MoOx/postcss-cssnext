var cssnext = require("./")
var t = require("microtime")
var assign = require("object-assign")

var input = require("fs").readFileSync("./test/fixtures/cases/example.css")

// test each features
var keys = Object.keys(cssnext.features)
var allOff = {}

keys.forEach(function(k) {
  allOff[k] = false
})

keys.forEach(function(k) {
  var enable = assign({}, allOff)
  enable[k] = true
  var start = t.now()
  cssnext(input, {features: enable})
  var stop = t.now()

  console.log(k + " takes " + ((stop - start) / 1000000) + "s") // , enable)
})
