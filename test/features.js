/**
 * Test dependencies
 */
var test = require("tape")

var utils = require("./utils")
var cssnext = require("..")
var cssnextStandalone = require("../dist/cssnext.js")

/**
 * Features tests
 */
var toSlug = require("to-slug-case")
var testFeature = function(t, feature, cssnext, version, source, input, expected) {
  var options = {from: source, sourcemap: false, features: {}}

  // disable all features
  Object.keys(cssnext.features).forEach(function(key) { options.features[key] = false })

  var css = cssnext(input, options)
  t.notEqual(css, expected, version + ": should not add " + feature + " support if disabled")
  t.equal(css, input, version + ": should not modify input if  " + feature + " is disabled")

  // enable only the one we want to test
  options.features[feature] = true
  t.equal(cssnext(input, options).trim(), expected.trim(), version + ": should add " + feature + " support")
}

Object.keys(cssnext.features).forEach(function(name) {
  var slug = toSlug(name)
  var source = utils.resolve("features/" + slug)
  var input = utils.read("features/" + slug)
  var expected = utils.read("features/" + slug + ".expected")

  test(slug, function(t) {
    testFeature(t, name, cssnext, "node.js", source, input, expected)

    // we do not support @import in the browser
    if ("import" === name) {
      t.end()
      return
    }

    testFeature(t, name, cssnextStandalone, "browser", source, input, expected)

    t.end()
  })
})
