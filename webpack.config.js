const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const pkg = require("./package.json")
const buildConfig = require("./build.config")

module.exports = {
  resolve: {
    extensions: [
      "",
      ".js",
      ".json",
      ".css",
    ],
  },

  module: {
    // ! \\ note that loaders are executed from bottom to top !
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          babelrc: false,
          ...pkg.babel.env.browsers,
        },
        exclude: /node_modules/,
      },
      // some plugins that are node4+ in da browsers need uglify compat
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          babelrc: false,
          ...pkg.babel.env.browsers,
        },
        include: /node_modules\/(chalk|ansi-styles|strip-ansi|postcss-.*)/,
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader!postcss-loader"
        ),
      },
      {
        test: /\.(ico|jpe?g|png|gif|svg)$/,
        loaders: [
          "file-loader?name=[path][name].[ext]&context=./docs/src",
        ],
      },
    ],
  },

  postcss: (webpack) => {
    return [
      require("postcss-import")({ addDependencyTo: webpack }),
      require("postcss-url")(),
      require("./lib/index.js")(), // postcss-cssnext !
      require("postcss-browser-reporter")(),
      require("postcss-reporter")(),
    ]
  },

  plugins: ([
    new webpack.DefinePlugin(buildConfig),
    new ExtractTextPlugin("[name].css", { disable: !buildConfig.__PROD__ }),
  ].concat(
      buildConfig.__PROD__
      ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          },
        }),
      ]
      : []
    )
  ),

  node: {
    // https://github.com/webpack/webpack/issues/451
    // run tape test with webpack
    fs: "empty",
  },
}
