const assign = require("object-assign")

const dev = process.argv.indexOf("--dev") > -1
const devServer = process.argv.indexOf("--dev-server") > -1
const production = process.argv.indexOf("--production") > -1

const config = assign(
  {
    __DEV__: dev,
    __DEV_SERVER__: devServer,
    __PROD__: production,
    __SERVER_PROTOCOL__: "http://",
  },
  (
    production
    ? {
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
      __SERVER_HOSTNAME__: "cssnext.io",
      __SERVER_HOST__: "cssnext.io",
    }
    : {
      __SERVER_HOSTNAME__: "0.0.0.0",
      __SERVER_PORT__: 1985,
      __SERVER_HOST__: "0.0.0.0:1985",
      __LR_SERVER_PORT__: 1986,
    }
  )
)

config.__SERVER_URL__ = `${config.__SERVER_PROTOCOL__}${config.__SERVER_HOST__}`

module.exports = config
