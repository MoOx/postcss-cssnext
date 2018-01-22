/* eslint-disable import/max-dependencies */
import path from "path";

import { sync as rm } from "rimraf";
import color from "chalk";

import Metalsmith from "metalsmith";
import markdown from "metalsmith-md";
import addFilenames from "metalsmith-filenames";
import url from "metalsmith-url";
import rename from "metalsmith-rename";
// import collections from "metalsmith-collections"
// import rss from "metalsmith-rss"
import react from "metalsmith-react";
import nanoLogger from "nano-logger";
import markdownIt from "markdown-it";
import watch from "metalsmith-watch";

import markdownOptions from "./markdown";
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor";

import pkg from "../../package";
import buildConfig from "../../build.config";
import webpackConfig from "../../webpack.config";
import webpack from "./webpack";
import devServer from "./webpack-dev-server";

const log = nanoLogger("./build");

JSON.stringify(buildConfig, null, 2)
  .split("\n")
  .forEach(l => log(l));

const mdToHtmlReplacement = [/\.md$/, ".html"];

// We clean ./dist by hand mainly for prod, in order to be able to build
// assets with webpack before metalsmith build.
// This allows us to get hashes in filename and pass them to the build
rm(path.join(__dirname, "..", "dist"));

const smith = new Metalsmith(path.join(__dirname, ".."));
smith
  .source("content")
  .destination("dist")
  // clean is made before
  .clean(false)

  // convert markdown
  .use(
    markdown({
      markdownIt: markdownIt(markdownOptions).use(markdownItTocAndAnchor, {
        tocFirstLevel: 2
      })
    })
  )

  // useful for some homemade plugins
  .use(addFilenames())

  // add url meta data with some replacements
  .use(url([mdToHtmlReplacement, [/index\.html?$/, ""]]))
  // wrap .html into react `template:`
  .use(
    react({
      pattern: ["**/*.md", "**/*.html"],
      templatesPath: "src/layouts",
      defaultTemplate: "Default",
      before: "<!doctype html>",
      data: {
        pkg,
        metadata: smith.metadata()
      }
    })
  )

  .use(
    rename([
      mdToHtmlReplacement,
      // no .html at the end of urls
      [/\.html$/, "/index.html"],
      // ensure we only have index.html, no index/index
      [/index\/index\.html$/, "index.html"]
    ])
  );

const webpackComputedConfig = {
  ...webpackConfig,
  entry: {
    index: ["./docs/src/index"],
    playground: ["./docs/src/modules/playground/index"]
  },

  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "[name].js",
    publicPath: "/"
  }
};

// for development, we build metalsmith first, then we serve via
// webpack-dev-server which build assets too (no hashes involved)
if (buildConfig.__DEV_SERVER__) {
  smith.metadata().assets = {
    version: String(new Date().getTime()),
    scripts: [
      "/index.js",
      `http://${buildConfig.__SERVER_HOSTNAME__}:${
        buildConfig.__LR_SERVER_PORT__
      }/livereload.js`
    ]
    // css is handled by the js via webpack style-loader
  };
  smith
    .use(
      watch({
        log: nanoLogger("watcher"),
        livereload: buildConfig.__LR_SERVER_PORT__,
        paths: {
          "${source}/**/*": true,
          "src/layouts/**/*": "**/*.md",
          "src/modules/**/*": "**/*.md"
        }
      })
    )
    .build(err => {
      if (err) {
        throw err;
      }

      devServer(webpackComputedConfig, {
        protocol: buildConfig.__SERVER_PROTOCOL__,
        host: buildConfig.__SERVER_HOSTNAME__,
        port: buildConfig.__SERVER_PORT__,
        open: process.argv.includes("--open")
      });
    });
} else {
  // for production we build assets first to be able to pass some assets hashes
  // to metalsmith
  webpack(webpackComputedConfig, log, stats => {
    log(color.green("✓ Assets build completed"));

    smith.metadata().assets = {
      version: stats.hash,
      scripts: ["/index.js"],
      ...(buildConfig.__PROD__
        ? {
            stylesheets: ["/index.css"]
          }
        : {})
    };

    smith.build(buildErr => {
      if (buildErr) {
        throw buildErr;
      }

      log(color.green("✓ Static build completed"));
    });
  });
}
