import path from "path"

import {sync as rm} from "rimraf"
import async from "async"
import color from "chalk"
import nanoLogger from "nano-logger"

import Metalsmith from "metalsmith"
import markdown from "metalsmith-md"
import addFilenames from "metalsmith-filenames"
import url from "metalsmith-url"
import rename from "metalsmith-rename"
// import collections from "metalsmith-collections"
// import rss from "metalsmith-rss"
import react from "metalsmith-react"

import markdownIt from "markdown-it"
import markdownOptions from "./markdown"
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor"

import webpack from "webpack"
import webpackConfig from "./webpack.config"

// prod
import copyWithContentHash from "copy-with-content-hash/hash-file"

// dev
import watch from "metalsmith-watch"
import devServer from "./webpack-dev-server"

import pkg from "../../package"

import variables, {defineGlobalVariables} from "./variables"
defineGlobalVariables()
const DEV_SERVER = process.argv.includes("--dev-server")

const log = nanoLogger("./build")

log(color.cyan("- Variables"))
JSON.stringify(variables, null, 2).split("\n").forEach(l => log(l))

const mdToHtmlReplacement = [/\.md$/, ".html"]

// We clean ./dist by hand mainly for prod, in order to be able to build
// assets with webpack before metalsmith build.
// This allows us to get hashes in filename and pass them to the build
rm(path.join(__dirname, "..", "dist"))

const smith = new Metalsmith(path.join(__dirname, ".."))
smith
.source("content")
.destination("dist")
// clean is made before
.clean(false)

// convert markdown
.use(
  markdown({
    markdownIt: markdownIt(markdownOptions)
      .use(markdownItTocAndAnchor, {
        tocFirstLevel: 2,
      }),
  })
)

// useful for some homemade plugins
.use(
  addFilenames()
)

// add url meta data with some replacements
.use(
  url([
    mdToHtmlReplacement,
    [/index\.html?$/, ""],
  ])
)
// wrap .html into react `template:`
.use(
  react({
    pattern: [
      "**/*.md",
      "**/*.html",
    ],
    templatesPath: "src/layouts",
    defaultTemplate: "Default",
    before: "<!doctype html>",
    data: {
      pkg: pkg,
      metadata: smith.metadata(),
    },
  })
)

.use(
  rename([
    mdToHtmlReplacement,
    // no .html at the end of urls
    [/\.html$/, "/index.html"],
    // ensure we only have index.html, no index/index
    [/index\/index\.html$/, "index.html"],
  ])
)

// for development, we build metalsmith first, then we serve via
// webpack-dev-server which build assets too (no hashes involved)
if (DEV_SERVER) {
  smith.metadata().assets = {
    scripts: [
      "/index.js",
      `http://${__SERVER_HOSTNAME__}:${__LR_SERVER_PORT__}/livereload.js`,
    ],
    // css is handled by the js via webpack style-loader
  }
  smith
    .use(
      watch({
        log: nanoLogger("watcher"),
        livereload: __LR_SERVER_PORT__,
        paths: {
          "${source}/**/*": true,
          "src/layouts/**/*": "**/*.md",
          "src/modules/**/*": "**/*.md",
        },
      })
    )
    .build((err) => {
      if (err) {
        throw err
      }

      devServer({
        protocol: __SERVER_PROTOCOL__,
        host: __SERVER_HOSTNAME__,
        port: __SERVER_PORT__,
        open: process.argv.includes("--open"),
      })
    })
}

// for production we build assets first to be able to pass some assets hashes
// to metalsmith
else {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw err
    }

    if (stats.hasErrors()) {
      stats.compilation.errors.forEach(
        item => log(...[color.red("Error:"), ...item.message.split("\n")])
      )
      throw new Error("webpack build failed with errors")
    }
    if (stats.hasWarnings()) {
      stats.compilation.warnings.forEach(
        item => log(...[color.yellow("Warning:"), ...item.message.split("\n")])
      )
    }

    console.log(color.green("\n✓ Assets build completed"))

    async.map(
      [
        "index.js",
        ...(__PROD__ ? ["index.css"] : []),
      ],
      (file, cb) => copyWithContentHash(`./docs/dist/${file}`, false, cb),
      (asynErr, results) => {
        if (asynErr) {
          throw asynErr
        }

        smith.metadata().assets = {
          scripts: ["/" + results[0]],
          ...(__PROD__ ? {stylesheets: ["/" + results[1]]} : {}),
        }
        smith
          .build(buildErr => {
            if (buildErr) {
              throw buildErr
            }

            console.log(color.green("\n✓ Static build completed"))
          })
      }
    )
  })
}
