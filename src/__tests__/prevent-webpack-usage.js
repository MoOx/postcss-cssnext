const test = require("tape")

import {join as joinPath, dirname} from "path"

import webpack from "webpack"

test("cssnext-loader recommendation", function(t) {
  webpack(
    {
      entry: {
        "prevent-webpack-usage": [
          // we don't care about what file is being used
          // because this should throw an error before the input being used
          "./package.json",
        ],
      },
      output: {
        // we don't care about the output...
        path: "./dist/__tests__/",
        filename: "prevent-webpack-usage.tmp-webpack-bundle.js",
      },
      module: {
        loaders: [
          {
            test: /\.json$/,
            // use directly cssnext index.js
            loader: joinPath(dirname(__filename), "..", "index.js"),
          },
        ],
      },
    },
    (err, stats) => {
      if (err) {
        throw err
      }

      if (!stats.hasErrors()) {
        t.fail(
          "doesn't throw an error if cssnext is used directly as webpack loader"
        )
      }
      else {
        t.ok(
          stats.compilation.errors[0].message.indexOf("cssnext-loader") > -1,
          "should recommand cssnext-loader"
        )
      }

      t.end()
    })
})
