/**
 * Test dependencies
 */
var exec = require("child_process").exec
var spawn = require("child_process").spawn
var fs = require("fs")

var test = require("tape")

var utils = require("./utils")

var cssnextBin = "node bin/cssnext" // node bin is used to help for windows

test("cli/watcher", function(t) {
  var planned = 0

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

    // watch/import tests
    var watchOut = "test/fixtures/cli.output--watch-import.css"

    var watchImportProcess = spawn("node", ["bin/cssnext", "--watch", "test/fixtures/cli.watch-import.css", watchOut], {stdio: "inherit"})

    // watch an empty file doesn't seems to work great, so I am using
    // /**/ to get a content
    // yeah...

    // trigger a change in cli.import.css to add a new watched file cli.import2.css
    fs.writeFileSync("test/fixtures/cli.watch-import.css", "/**/ @import 'cli.watch-import-import.css';")

    // we are using setTimeout for the watcher to do his job
    setTimeout(function() {
      // check the output has been updated (watcher works)
      t.equal(fs.readFileSync(watchOut, {encoding:"utf8"}), "/**/ watch{}", "should update the file")

      // remove this newly imported file
      fs.writeFileSync("test/fixtures/cli.watch-import.css", "/**/")

      // check the output has been update
      setTimeout(function() {
        t.equal(fs.readFileSync(watchOut, {encoding:"utf8"}), "/**/", "should update the file, again")

        setTimeout(function() {
          // previously imported file should not be watched anymore
          // to check that we read output mtime, modify the file that should not be watched
          // and check back that the output file has the same mtime

          // trigger a change in previously imported file
          var now = (new Date()).getTime()
          fs.utimesSync("test/fixtures/cli.watch-import-import.css", now, now)

          // not sure why but it's better with the statSync on the watched file in this delayed call
          setTimeout(function() {
            var outStat = fs.statSync(watchOut)

            setTimeout(function() {
              // this time, it should not trigger anything
              var outStatAfter = fs.statSync(watchOut)
              t.equal(outStat.mtime.getTime(), outStatAfter.mtime.getTime(), "should not modify a file if a previously imported file is modified")

              utils.remove("cli.output--watch-import")
              watchImportProcess.kill()
            }, 1000)
          }, 1000)
        }, 1000)
      }, 1000)
    }, 1000)

    planned+=3
  }

  t.plan(planned)
})
