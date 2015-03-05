/**
 * Test dependencies
 */
var exec = require("child_process").exec

var test = require("tape")

var utils = require("./utils")
var cssnext = require("..")

/**
 * CLI tests
 */
var input = utils.readFixture("cli")
var output = utils.readFixture("cli.expected")

var cssnextBin = "node bin/cssnext" // node bin is used to help for windows

test("cli", function(t) {
  var planned = 0

  exec(cssnextBin + " test/fixtures/cli.css test/fixtures/cli.output--io.css", function(err) {
    if (err) { throw err }
    var res = utils.readFixture("cli.output--io")
    t.equal(res, output, "should read from a file and write to a file")
    utils.remove("cli.output--io")
  })
  planned+=1

  exec(cssnextBin + " test/fixtures/cli.css", function(err, stdout) {
    if (err) { throw err }
    t.equal(stdout, output, "should read from a file and write to stdout")
  })
  planned+=1

  var childProcess = exec(cssnextBin, function(err, stdout) {
    if (err) { throw err }
    t.equal(stdout, output, "should read from stdin and write to stdout")
  })
  childProcess.stdin.write(new Buffer(input))
  childProcess.stdin.end()
  planned+=1

  exec(cssnextBin + " test/fixtures/cli.wtf.css", function(err, stdout, stderr) {
    t.ok(err && err.code === 1, "should return an error when input file is unreadable")
    t.ok(utils.contains(stderr, "Unable to read file"), "should show that the input file is not found")
  })
  planned+=2

  exec(cssnextBin + " test/fixtures/cli.error.css", function(err, stdout, stderr) {
    t.ok(err && err.code === 2, "should throw an error")
    t.ok(utils.contains(stderr, "encounters an error"), "should output a readable error")
    t.ok(utils.contains(stderr, "If this error looks like a bug, please report it here"), "should show the url where to report bugs")
  })
  planned+=3

  exec(cssnextBin + " --config test/fixtures/config.json test/fixtures/config.css", function(err, stdout) {
    if (err) { throw err }
    t.equal(stdout, utils.readFixture("config.expected"), "should read config file on --config")
  })
  planned+=1

  exec(cssnextBin + " --verbose test/fixtures/cli.css test/fixtures/cli.output--verbose.css", function(err, stdout) {
    if (err) { throw err }
    t.ok(utils.contains(stdout, "Output written"), "should log on --verbose")
    utils.remove("cli.output--verbose")
  })
  planned+=1

  exec(cssnextBin + " --no-import test/fixtures/import.css", function(err, stdout) {
    if (err) { throw err }
    t.equal(stdout, utils.readFixture("import"), "should not import on --no-import")
  })
  planned+=1

  exec(cssnextBin + " --no-url test/fixtures/url.css", {cwd: process.cwd()}, function(err, stdout) {
    if (err) { throw err }
    t.equal(stdout, utils.readFixture("url/dep"), "should not adjust url on --no-url")
  })
  planned+=1

  exec(cssnextBin + " --compress test/fixtures/compress.css", function(err, stdout) {
    if (err) { throw err }
    t.equal(stdout, utils.readFixture("compress.default.expected").trim(), "should compress on --compress")
  })
  planned+=1

  exec(cssnextBin + " --sourcemap test/fixtures/sourcemap.css", function(err, stdout) {
    if (err) { throw err }
    t.equal(stdout, utils.readFixture("sourcemap.expected").trim(), "should add sourcemap on --sourcemap")
  })
  planned+=1

  var toSpace = require("to-space-case")
  var toSlug = require("to-slug-case")
  var features = Object.keys(cssnext.features)
  var no = "--no-" + features.map(function(feature) { return toSlug(feature)}).join(" --no-")
  features.forEach(function(feature) {
    var slug = toSlug(feature)
    var output = utils.readFixture("features/" + slug)
    exec(cssnextBin + " " + no + " test/fixtures/features/" + slug + ".css", function(err, stdout) {
      if (err) { throw err }
      t.equal(stdout, output, "should not modify input of '" + toSpace(feature) + "' fixture if all features are disabled")
    })
  })
  planned+=features.length

  exec(cssnextBin + " --watch", function(err, stdout, stderr) {
    t.ok(err && err.code === 3, "should return an error when <input> or <output> are missing when `--watch` option passed")
    t.ok(utils.contains(stderr, "--watch option need"), "should show an explanation when <input> or <output> are missing when `--watch` option passed")
  })
  planned+=2

  exec(cssnextBin + " --watch test/fixtures/cli.css", function(err, stdout, stderr) {
    t.ok(err && err.code === 3, "should return an error when <output> is missing when `--watch` option passed")
    t.ok(utils.contains(stderr, "--watch option need"), "should show an explanation when <output> is missing when `--watch` option passed")
  })
  planned+=2

  // I don't success to call the kill() process from node and both Travis CI and Appveyor
  // so we avoid this test on this environnements
  if (!process.env.TRAVIS && !process.env.APPVEYOR) {
    var watchProcess = exec(cssnextBin + " --watch test/fixtures/cli.error.css test/fixtures/cli.output--watch.css", function(err) {
      t.ok(err && err.signal === "SIGTERM", "should only be killed by an interrupt when `--watch` option passed")
      if (err && !err.killed) { throw err }
    })
    var msgWatch = "should output error messages when `--watch` option passed"
    var watchTimeout = setTimeout(function() {
      t.fail(msgWatch)
      watchProcess.kill()
    }, 5000)
    watchProcess.stderr.on("data", function(data) {
      if (utils.contains(data, "encounters an error")) {
        t.pass(msgWatch)
        clearTimeout(watchTimeout)
        watchProcess.kill()
      }
    })
    planned+=2
  }

  t.plan(planned)
})
