#!/usr/bin/env node

import fs from "fs"
import path from "path"

// until this land in a stable version of node (for a while)
// https://github.com/joyent/node/commit/20176a
// we will this instead of process.exit()
import exit from "exit"

import mkdirp from "mkdirp"
import color from "chalk"
import program from "commander"

import cssnext from ".."
import pkg from "../package"

program
  .version(pkg.version)
  .usage("[options] [<input> [<output>]]")
  .option("-C, --config <file>", "use the config file")
  .option("-b, --browsers <items>", "browsers list (comma separated)")
  .option("-I, --no-import", "do not inline @import")
  .option("-U, --no-url", "do not adjust url()")
  .option("-c, --compress", "compress output")
  .option("-s, --sourcemap", "add sourcemap")
  .option("-w, --watch", "watch the input file for changes")
  .option("-v, --verbose", "verbose output")

// register features as flag
const format = require("util").format
const toSlug = require("to-slug-case")
const toSpace = require("to-space-case")
Object.keys(cssnext.features).forEach(function(feature) {
  const flag = format("--no-%s", toSlug(feature))
  const desc = format("disable %s support", toSpace(feature))
  program.option(flag, desc)
})

/* eslint-disable no-multiple-empty-lines */
program.on("--help", function() {
  console.log(function() {/*
  Examples:

    # pass an input and output file
    $ cssnext input.css output.css


    # start cssnext watcher (need input & output)
    $ cssnext --watch input.css output.css


    # using stdin and stdout
    $ cat input.css | cssnext > output.css
  */
  }.toString().split("\n").slice(1, -2).join("\n"))
})
/* eslint-enable no-multiple-empty-lines */

program.parse(process.argv)

const config = program.config ? require(path.resolve(program.config)) : {}
if (!config.features) {
  config.features = {}
}
// command line flags override config file
Object.keys(cssnext.features).forEach(function(feature) {
  if (program[feature] === false) {
    config.features[feature] = false
  }
})
if ("browsers" in program) {
  config.browsers = program.browsers
}
if ("import" in program) {
  config.import = program.import
}
if ("url" in program) {
  config.url = program.url
}
if ("sourcemap" in program) {
  config.sourcemap = program.sourcemap
}
if ("compress" in program) {
  config.compress = program.compress
}
if ("watch" in program) {
  config.watch = program.watch
}

const input = program.args[0] ? path.resolve(program.args[0]) : null
const output = program.args[1] ? path.resolve(program.args[1]) : null
const verbose = program.verbose

if (input && !fs.existsSync(input)) {
  console.error(color.red("Unable to read file"), input)
  exit(1)
}

config.from = input
config.to = output

if (output) {
  mkdirp.sync(path.dirname(output))
}

// init & adjust watcher with postcss-import dependencies
let watcher
if (config.watch) {
  if (!input || !output) {
    console.error(
      color.red("--watch option need both <input> & <output> files to work")
    )
    exit(3)
  }

  watcher = require("chokidar").watch(input, {ignoreInitial: true})

  if (verbose) {
    log(color.cyan("Watching"), input)
  }

  // https://github.com/paulmillr/chokidar/issues/288
  // ready event might not be triggered at all
  // watcher.on("ready", function() {
  //   if (verbose) {
  //     log(color.cyan("Watcher ready"), input)
  //   }
  // })

  watcher.on("change", transform)

  // watch `@import`ed files
  if (config.import) {
    // keep a up to date list of imported files
    let importedFiles = [input]
    const arrayDiff = function(array, array2) {
      return array.filter(function(i) {
        return array2.indexOf(i) < 0
      })
    }

    const rebaseFile = function(file) {
      return path.relative(process.cwd(), file)
    }

    const watcherOnImport = function(imported) {
      const toUnwatch = arrayDiff(importedFiles, imported)
      const toWatch = arrayDiff(imported, importedFiles)
      toUnwatch.forEach(function(file) {
        watcher.unwatch(rebaseFile(file))
      })
      toWatch.forEach(function(file) {
        watcher.add(rebaseFile(file))
      })
      importedFiles = imported
    }

    // import need an object so we can pass onImport() cb
    if (typeof config.import !== "object") {
      config.import = {}
    }

    // keep the existing onImport callback if any
    if (config.import.onImport) {
      config.import.onImport = function(files) {
        const originalOnImport = config.import.onImport
        watcherOnImport(files)
        originalOnImport(files)
      }
    }
    // or just add the watcher updater onImport() cb
    else {
      config.import.onImport = watcherOnImport
    }
  }
}

function transform() {
  require("read-file-stdin")(input, function(err, buffer) {
    if (err) {
      throw err
    }

    try {
      const css = cssnext(buffer.toString(), config)

      require("write-file-stdout")(output, css)
      if (verbose && output) {
        log(color.cyan("Output written"), output)
      }
    }
    catch (e) {
      console.error()
      console.error(color.bold("cssnext encounters an error:"))
      console.error()
      console.error(color.red(e.message))
      if (e.stack) {
        console.error(e.stack.split("\n").slice(1).join("\n").grey)
        console.error()
      }
      console.error("If this error looks like a bug, please report it here:")
      console.error(color.grey("❯ ") + color.cyan(pkg.bugs.url))
      console.error()
      if (!config.watch) {
        exit(2)
      }
    }
  })
}

transform()

/**
 * log content prefixed by time
 *
 * @return {String} output all given parameters prefixed by the current locale
 * time
 */
function log() {
  const args = [].slice.call(arguments)
  args.unshift("[" + color.grey(new Date().toLocaleTimeString()) + "]")
  console.log.apply(console.log, args)
}
