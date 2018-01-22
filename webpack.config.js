const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const pkg = require("./package.json");
const buildConfig = require("./build.config");

module.exports = {
  resolve: {
    mainFields: ["browser", "main"]
  },
  module: {
    // ! \\ note that loaders are executed from bottom to top !
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          babelrc: false,
          ...pkg.babel.env.browsers
        },
        exclude: /node_modules/
      },
      // some plugins that are node4+ in da browsers need uglify compat
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          babelrc: false,
          ...pkg.babel.env.browsers
        },
        include: /node_modules\/(chalk|ansi-styles|strip-ansi|postcss-.*)/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(ico|jpe?g|png|gif|svg)$/,
        loaders: ["file-loader?name=[path][name].[ext]&context=./docs/src"]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin(buildConfig),
    new ExtractTextPlugin({
      filename: "[name].css",
      disable: !buildConfig.__PROD__
    })
  ].concat(
    buildConfig.__PROD__
      ? [
          new webpack.optimize.DedupePlugin(),
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                warnings: false
              }
            }
          })
        ]
      : []
  ),

  node: {
    // https://github.com/webpack/webpack/issues/451
    // run tape test with webpack
    fs: "empty"
  }
};
