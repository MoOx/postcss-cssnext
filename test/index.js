var test = require("tape")
var cssnext = require("..")
var cssnextStandalone = require("../dist/cssnext.js")

test("cssnext", function(t) {
  t.ok(typeof cssnext("html{}") === "string", "should return a string")
  t.ok(typeof cssnext("") === "string", "should return a string, even if the given string is empty")
  var postcssInstance = cssnext()
  t.ok(typeof postcssInstance === "object" && postcssInstance.process, "should return a postcss instance")

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
    "should be able to compress"
  )

  t.end()
})

/**
 * Sourcemap tests
 */
test("sourcemap", function(t) {
  var options = {
    from: "./test/sourcemap/input.css",
    sourcemap:  true
  }
  t.equal(
    cssnext(
      read("sourcemap/input"),
      options
    ).trim(),
    read("sourcemap/expected-inline").trim(),
    "should contain a correct inlined sourcemap"
  )

  t.ok(!options.hasOwnProperty("map"), "doesn't mutate options object")

  var result = cssnext(
    read("sourcemap/input"),
    {
      from: "./test/sourcemap/input.css",
      map: {inline: false}
    }
  )

  t.equal(
    result.map.toString(),
    read("sourcemap/expected", ".map").trim(),
    "should contain a correct sourcemap"
  )

  t.end()
})

/**
 * Use cases test
 */
test("use case: color plugins together", function(t) {
  t.equal(
    cssnext(
      read("cases/color"),
      {}
    ).trim(),
    read("cases/color.expected").trim(),
    "all color plugins should works together"
  )

  t.end()
})

test("use case: use plugin options", function(t) {
  t.equal(
    cssnext(
      read("cases/plugin-options"),
      {
        features: {
          customProperties: {
            preserve: true
          }
        }
      }
    ).trim(),
    read("cases/plugin-options.expected").trim(),
    "should be able to pass options to plugins"
  )

  t.end()
})

/**
 * CLI tests.
 */

test("cli", function(t) {
  var exec = require("child_process").exec

  var input = read("cli/input")
  var output = read("cli/input.expected")

  var planned = 0

  exec("bin/cssnext test/cli/input.css test/cli/output.css", function(err) {
    if (err) { throw err }
    var res = read("cli/output")
    t.equal(res, output, "should read from a file and write to a file")
    remove("cli/output")
  })
  planned+=1

  exec("bin/cssnext test/cli/input.css", function(err, stdout) {
    if (err) { throw err }
    t.equal(stdout, output, "should read from a file and write to stdout")
  })
  planned+=1

  var childProcess = exec("bin/cssnext", function(err, stdout) {
    if (err) { throw err }
    t.equal(stdout, output, "should read from stdin and write to stdout")
  })
  childProcess.stdin.write(new Buffer(input))
  childProcess.stdin.end()
  planned+=1

  exec("bin/cssnext test/cli/wtf.css", function(err, stdout, stderr) {
    t.ok(err && err.code === 1, "should return an error when input file is unreadable")
    t.ok(contains(stderr, "Unable to read file"), "should show that the input file is not found")
  })
  planned+=2

  exec("bin/cssnext test/cli/error.css", function(err, stdout, stderr) {
    t.ok(err && err.code === 2, "should throw an error")
    t.ok(contains(stderr, "encounters an error"), "should output a readable error")
    t.ok(contains(stderr, "If this error looks like a bug, please report it here"), "should show the url where to report bugs")
  })
  planned+=3

  exec("bin/cssnext --verbose test/cli/input.css test/cli/output.css", function(err, stdout) {
    if (err) { throw err }
    t.ok(contains(stdout, "Output written"), "should log on --verbose")
    remove("cli/output")
  })
  planned+=1

  exec("bin/cssnext --compress test/compress/input.css", function(err, stdout) {
    if (err) { throw err }
    t.equal(stdout, read("compress/expected").trim(), "should compress on --compress")
  })
  planned+=1

  exec("bin/cssnext --sourcemap test/sourcemap/input.css", function(err, stdout) {
    if (err) { throw err }
    t.equal(stdout, read("sourcemap/expected-inline").trim(), "should add sourcemap on --sourcemap")
  })
  planned+=1

  var toSpace = require("to-space-case")
  var toSlug = require("to-slug-case")
  var features = Object.keys(cssnext.features)
  var no = "--no-" + features.map(function(feature) { return toSlug(feature)}).join(" --no-")
  features.forEach(function(feature) {
    var slug = toSlug(feature)
    var output = read("features/" + slug)
    exec("bin/cssnext " + no + " test/features/" + slug + ".css", function(err, stdout) {
      if (err) { throw err }
      t.equal(stdout, output, "should not modify input of '" + toSpace(feature) + "' fixture if all features are disabled")
    })
  })
  planned+=features.length

  exec("bin/cssnext --watch", function(err, stdout, stderr) {
    t.ok(err && err.code === 3, "should return an error when <input> or <output> are missing when `--watch` option passed")
    t.ok(contains(stderr, "--watch option need"), "should show an explanation when <input> or <output> are missing when `--watch` option passed")
  })
  planned+=2

  exec("bin/cssnext --watch test/cli/input.css", function(err, stdout, stderr) {
    t.ok(err && err.code === 3, "should return an error when <output> is missing when `--watch` option passed")
    t.ok(contains(stderr, "--watch option need"), "should show an explanation when <output> is missing when `--watch` option passed")
  })
  planned+=2

  t.plan(planned)
})

/**
 * Resolve a fixture by `filename`.
 *
 * @param {String} filename
 * @return {String}
 */

function resolve(filename, ext) {
  ext = (ext !== undefined ? ext : ".css")
  return require("path").resolve(__dirname, filename + ext)
}

/**
 * Read a fixture by `filename`.
 *
 * @param {String} filename
 * @return {String}
 */

function read(filename, ext) {
  return require("fs").readFileSync(resolve(filename, ext), "utf8")
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
