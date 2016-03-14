const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

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
        loaders: [
          "babel",
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
          "css-loader!postcss-loader"
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
