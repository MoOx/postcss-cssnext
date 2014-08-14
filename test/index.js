var test = require("tape")

var cssnext = require("..")

test("cssnext", function(t) {
  t.ok(typeof cssnext("html{}") === "string", "should return a string")

  t.end()
})

/**
 * Features tests
 */
var toSlug = require("to-slug-case")
Object.keys(cssnext.features).forEach(function(name) {
  var slug = toSlug(name)
  var source = resolve("features/" + slug)
  var input = read("features/" + slug)
  var expected = read("features/" + slug + ".expected")

  test(slug, function(t) {
    var options = {from: source, sourcemap: false, features: {}}

    // disable all features
    Object.keys(cssnext.features).forEach(function(key) { options.features[key] = false })

    var css = cssnext(input, options)
    t.notEqual(css, expected, "should not add " + slug + " support if disabled")
    t.equal(css, input,  "should not modify input if  " + slug + " is disabled")

    // enable only the one we want to test
    options.features[name] = true
    t.equal(cssnext(input, options), expected, "should add " + slug + " support")

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

