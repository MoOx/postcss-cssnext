import path from "path"

import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"

import variables, {defineGlobalVariables} from "./variables"
defineGlobalVariables()

const production = __PROD__ || process.argv.includes("--production")

var config = {
  entry: {
    index: [
      "./docs/src/index",
    ],
    playground: [
      "./docs/src/modules/playground/index",
    ],
  },

  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "[name].js",
    publicPath: "/",
  },

  resolve: {
    extensions: [
      "",
      ".js",
      ".json",
      ".css",
    ],

    alias: {
      "caniuse-db": path.resolve(__dirname, "../../node_modules/caniuse-db"),
    },
  },

  module: {
    // ! \\ note that loaders are executed from bottom to top !
    loaders: [
      {
        test: /\.(jsx?|es)$/,
        loaders: [
          "babel?" + JSON.stringify({
            stage: 0,
          }),
          "eslint",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loaders: [
          "json",
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader!cssnext-loader"
        ),
      },
      {
        test: /\.(ico|jpe?g|png|gif|svg)$/,
        loaders: [
          "file?name=[path][name].[ext]&context=./docs/src",
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin(variables),
    new ExtractTextPlugin("[name].css", {disable: !production}),
    ...(production ?
        [
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false,
            },
          }),
        ] :
        []
    ),
  ],

  node: {
    // https://github.com/webpack/webpack/issues/451
    // run tape test with webpack
    fs: "empty",
  },
}

export default config
