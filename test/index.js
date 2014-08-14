var test = require("tape")
var cssnext = require("..")
var cssnextStandalone = require("../dist/cssnext.js")

test("cssnext", function(t) {
  t.ok(typeof cssnext("html{}") === "string", "should return a string")

  t.end()
})

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
  t.equal(cssnext(input, options), expected, version + ": should add " + feature + " support")
}

Object.keys(cssnext.features).forEach(function(name) {
  var slug = toSlug(name)
  var source = resolve("features/" + slug)
  var input = read("features/" + slug)
  var expected = read("features/" + slug + ".expected")

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

/**
 * Sourcemap tests
 */
test("sourcemap", function(t) {
  t.equal(
    cssnext(
      read("sourcemap/input"),
      {from: "./test/sourcemap/input.css"}
    ),
    read("sourcemap/expected"),
    "should contain a correct sourcemap"
  )

  t.end()
})

/**
 * Resolve a fixture by `filename`.
 *
 * @param {String} filename
 * @return {String}
 */

function resolve(filename) {
  return require("path").resolve(__dirname, filename + ".css")
}

/**
 * Read a fixture by `filename`.
 *
 * @param {String} filename
 * @return {String}
 */

function read(filename) {
  return require("fs").readFileSync(resolve(filename), "utf8")
}

/**
 * Remove a fixture by `filename`.
 *
 * @param {String} filename
 */

// function remove(filename) {
//   var fs = require("fs")
//
//   var file = resolve(filename)
//   if (!fs.existsSync(file)) {
//     return
//   }
//   fs.unlinkSync(file)
// }
