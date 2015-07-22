/**
 * Test dependencies
 */
import {exec} from "child_process"

import test from "tape"

import utils from "./utils"
import cssnext from ".."

import isBabel from "./utils/isBabel"

/**
 * CLI tests
 */
const input = utils.readFixture("cli")
const output = utils.readFixture("cli.expected")

// node bin is used to help for windows
const cssnextBin = isBabel ? "babel-node src/bin" : "node dist/bin"

test("cli", function(t) {
  let planned = 0

  exec(
    cssnextBin +
      " src/__tests__/fixtures/cli.css" +
      " src/__tests__/fixtures/cli.output--io.css",
    function(err) {
      if (err) {
        throw err
      }
      const res = utils.readFixture("cli.output--io")
      t.equal(res, output, "should read from a file and write to a file")
      utils.remove("cli.output--io")
    }
  )
  planned += 1

  exec(
    cssnextBin +
      " src/__tests__/fixtures/cli.css" +
      " src/__tests__/fixtures/cli/output--io.css",
    function(err) {
      if (err) {
        throw err
      }
      const res = utils.readFixture("cli/output--io")
      t.equal(
        res,
        "body {\n  color: #e00;\n  background: url(../url);\n}\n",
        "should rebase url"
      )
      utils.remove("cli/output--io")
    }
  )
  planned += 1

  exec(cssnextBin + " src/__tests__/fixtures/cli.css", function(err, stdout) {
    if (err) {
      throw err
    }
    t.equal(
      stdout,
      output, "should read from a file and write to stdout"
    )
  })
  planned += 1

  const childProcess = exec(cssnextBin, function(err, stdout) {
    if (err) {
      throw err
    }
    t.equal(stdout, output, "should read from stdin and write to stdout")
  })
  childProcess.stdin.write(new Buffer(input))
  childProcess.stdin.end()
  planned += 1

  exec(
    cssnextBin + " src/__tests__/fixtures/cli.dont-exist.css",
    function(err, stdout, stderr) {
      t.ok(
        err && err.code === 1,
        "should return an error when input file is unreadable"
      )
      t.ok(
        utils.contains(stderr, "Unable to read file"),
        "should show that the input file is not found"
      )
    }
  )
  planned += 2

  exec(
    cssnextBin + " src/__tests__/fixtures/cli.error.css",
    function(err, stdout, stderr) {
    t.ok(err && err.code === 2, "should throw an error")
    t.ok(
      utils.contains(stderr, "encounters an error"),
      "should output a readable error")
    t.ok(
      utils.contains(
        stderr,
        "If this error looks like a bug, please report it here"
      ),
      "should show the url where to report bugs"
    )
  })
  planned += 3

  exec(
    cssnextBin +
      " --config src/__tests__/fixtures/config.json" +
      " src/__tests__/fixtures/config.css",
    function(err, stdout) {
    if (err) {
      throw err
    }
    t.equal(
      stdout,
      utils.readFixture("config.expected"),
      "should read config file on --config"
    )
  })
  planned += 1

  const noCustomPropInput = ":root{--foo:bar}baz{qux:var(--foo)}"
  const childProcessBrowsers = exec(
    cssnextBin + " --browsers \"Firefox >= 31\"",
    function(err, stdout) {
    if (err) {
      throw err
    }
    t.equal(stdout, noCustomPropInput, "should have a --browsers option")
  })
  childProcessBrowsers.stdin.write(new Buffer(noCustomPropInput))
  childProcessBrowsers.stdin.end()
  planned += 1

  exec(
    cssnextBin +
      " --verbose src/__tests__/fixtures/cli.css" +
      " src/__tests__/fixtures/cli.output--verbose.css"
    ,
    function(err, stdout) {
      if (err) {
        throw err
      }
      t.ok(utils.contains(stdout, "Output written"), "should log on --verbose")
      utils.remove("cli.output--verbose")
    }
  )
  planned += 1

  exec(
    cssnextBin + " --no-import src/__tests__/fixtures/import.css",
    function(err, stdout) {
    if (err) {
      throw err
    }
    t.equal(
      stdout,
      utils.readFixture("import"),
      "should not import on --no-import"
    )
  })
  planned += 1

  exec(
    cssnextBin + " --no-url src/__tests__/fixtures/url.css",
    {cwd: process.cwd()},
    function(err, stdout) {
      if (err) {
        throw err
      }
      t.equal(
        stdout,
        utils.readFixture("url/dep"),
        "should not adjust url on --no-url"
      )
    }
  )
  planned += 1

  exec(
    cssnextBin + " --compress src/__tests__/fixtures/compress.css",
    function(err, stdout) {
      if (err) {
        throw err
      }
      t.equal(
        stdout.trim(),
        utils.readFixture("compress.default.expected").trim(),
        "should compress on --compress"
      )
    }
  )
  planned += 1

  exec(
    cssnextBin + " --sourcemap src/__tests__/fixtures/sourcemap.css",
    function(err, stdout) {
      if (err) {
        throw err
      }
      t.ok(
        stdout
          .indexOf("/*# sourceMappingURL=data:application/json;base64,")
          > -1
        ,
        "should add sourcemap on --sourcemap"
      )
    }
  )
  planned += 1

  const toSpace = require("to-space-case")
  const toSlug = require("to-slug-case")
  const features = Object.keys(cssnext.features)
  const no = "--no-" + features.map(function(feature) {
    return toSlug(feature)
  }).join(" --no-")
  features.forEach(function(feature) {
    const slug = toSlug(feature)
    const featureOutput = utils.readFixture("features/" + slug)
    exec(
      cssnextBin + " " + no +
        " src/__tests__/fixtures/features/" + slug + ".css",
      function(err, stdout) {
        if (err) {
          throw err
        }
        t.equal(
          stdout,
          featureOutput,
          "should not modify input of '" + toSpace(feature) +
            "' fixture if all features are disabled"
        )
      }
    )
  })
  planned += features.length

  exec(
    cssnextBin + " --watch",
    function(err, stdout, stderr) {
      t.ok(err && err.code === 3,
        "should return an error when <input> or <output> are missing when " +
          "`--watch` option passed"
      )
      t.ok(
        utils.contains(stderr, "--watch option need"),
        "should show an explanation when <input> or <output> are missing when" +
          " `--watch` option passed"
      )
    }
  )
  planned += 2

  exec(
    cssnextBin + " --watch src/__tests__/fixtures/cli.css",
    function(err, stdout, stderr) {
      t.ok(
        err && err.code === 3,
        "should return an error when <output> is missing when `--watch`" +
          "option passed"
      )
      t.ok(
        utils.contains(stderr, "--watch option need"),
        "should show an explanation when <output> is missing when `--watch` " +
          "option passed"
      )
    }
  )
  planned += 2

  t.plan(planned)
})
