var test = require("tape")

var cssnext = require("..")

test("cssnext", function(t) {
  t.ok(typeof cssnext("html{}") === "string", "should return a string")

  t.end()
})

var toSlug = require("to-slug-case")
Object.keys(cssnext.features).forEach(function(name) {
  var slug = toSlug(name)
  var source = resolve("features/" + slug)
  var input = read("features/" + slug)
  var expected = read("features/" + slug + ".expected")

  test(slug, function(t) {
    t.equal(cssnext(input, {from: source}), expected, "should add " + slug + " support")

    var options = {from: source, features: {}}
    options.features[name] = false
    var css = cssnext(input, options)
    t.notEqual(css, expected, "should not add " + slug + " support if disabled")
    t.equal(css, input,  "should not modify input if  " + slug + " is disabled")

    t.end()
  })
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

