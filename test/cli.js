/**
 * Test dependencies
 */
var test = require("tape")
var exec = require("child_process").exec

var utils = require("./utils")
var cssnext = require("..")

/**
 * CLI tests
 */
var input = utils.read("cli/input")
var output = utils.read("cli/input.expected")


test("cli", function(t) {
  var planned = 0

  exec("bin/cssnext test/cli/input.css test/cli/output.css", function(err) {
    if (err) { throw err }
    var res = utils.read("cli/output")
    t.equal(res, output, "should read from a file and write to a file")
    utils.remove("cli/output")
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
    t.ok(utils.contains(stderr, "Unable to read file"), "should show that the input file is not found")
  })
  planned+=2

  exec("bin/cssnext test/cli/error.css", function(err, stdout, stderr) {
    t.ok(err && err.code === 2, "should throw an error")
    t.ok(utils.contains(stderr, "encounters an error"), "should output a readable error")
    t.ok(utils.contains(stderr, "If this error looks like a bug, please report it here"), "should show the url where to report bugs")
  })
  planned+=3

  exec("bin/cssnext --verbose test/cli/input.css test/cli/output.css", function(err, stdout) {
    if (err) { throw err }
    t.ok(utils.contains(stdout, "Output written"), "should log on --verbose")
    utils.remove("cli/output")
  })
  planned+=1

  exec("bin/cssnext --compress test/compress/input.css", function(err, stdout) {
    if (err) { throw err }
    t.equal(stdout, utils.read("compress/expected").trim(), "should compress on --compress")
  })
  planned+=1

  exec("bin/cssnext --sourcemap test/sourcemap/input.css", function(err, stdout) {
    if (err) { throw err }
    t.equal(stdout, utils.read("sourcemap/expected-inline").trim(), "should add sourcemap on --sourcemap")
  })
  planned+=1

  var toSpace = require("to-space-case")
  var toSlug = require("to-slug-case")
  var features = Object.keys(cssnext.features)
  var no = "--no-" + features.map(function(feature) { return toSlug(feature)}).join(" --no-")
  features.forEach(function(feature) {
    var slug = toSlug(feature)
    var output = utils.read("features/" + slug)
    exec("bin/cssnext " + no + " test/features/" + slug + ".css", function(err, stdout) {
      if (err) { throw err }
      t.equal(stdout, output, "should not modify input of '" + toSpace(feature) + "' fixture if all features are disabled")
    })
  })
  planned+=features.length

  exec("bin/cssnext --watch", function(err, stdout, stderr) {
    t.ok(err && err.code === 3, "should return an error when <input> or <output> are missing when `--watch` option passed")
    t.ok(utils.contains(stderr, "--watch option need"), "should show an explanation when <input> or <output> are missing when `--watch` option passed")
  })
  planned+=2

  exec("bin/cssnext --watch test/cli/input.css", function(err, stdout, stderr) {
    t.ok(err && err.code === 3, "should return an error when <output> is missing when `--watch` option passed")
    t.ok(utils.contains(stderr, "--watch option need"), "should show an explanation when <output> is missing when `--watch` option passed")
  })
  planned+=2

  t.plan(planned)
})
