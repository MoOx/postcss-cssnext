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
  t.equal(cssnext(input, options).trim(), expected.trim(), version + ": should add " + feature + " support")
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
 * Compress tests
 */
test("compress", function(t) {
  t.equal(
    cssnext(
      read("compress/input"),
      {compress: true}
    ).trim(),
    read("compress/expected").trim(),
    "should compress on --compress (thanks Captain Obvious)"
  )

  t.end()
})

/**
 * Sourcemap tests
 */
test("sourcemap", function(t) {
  t.equal(
    cssnext(
      read("sourcemap/input"),
      {from: "./test/sourcemap/input.css"}
    ).trim(),
    read("sourcemap/expected").trim(),
    "should contain a correct sourcemap"
  )

  t.end()
})

/**
 * CLI tests.
 */

test("cli", function(t) {
  var exec = require("child_process").exec

  var output = read("cli/input.expected")

  var planned = 0

  exec("bin/cssnext test/cli/input.css test/cli/output.css", function(err) {
    if (err) { throw err }
    var res = read("cli/output")
    t.equal(res, output, "should read from a file and write to a file")
    remove("cli/output")
  })
  planned+=1

  exec("bin/cssnext test/cli/error.css", function(err, stdout, stderr) {
    t.ok(err && err.code === 2, "should throw an error")
    t.ok(contains(stderr, "encounters an error"), "should output a readable error")
    t.ok(contains(stderr, "If this error looks like a bug, please report it here"), "should show the url where to report bugs")
  })
  planned+=3

  t.plan(planned)
})

/*
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
function remove(filename) {
  var fs = require("fs")

  var file = resolve(filename)
  if (!fs.existsSync(file)) {
    return
  }
  fs.unlinkSync(file)
}

/**
 * Check if a string is contained into another
 *
 * @param  {String}  string string to look into
 * @param  {String}  piece  string to find
 * @return {Boolean}        returns true if piece is contained in string
 */
function contains(string, piece) {
  return Boolean(string.indexOf(piece) + 1)
}
