/**
 * Modules dependencies
 */
var Postcss = require("postcss")
var assign = require("object-assign")

var features = {
  // Reminder: order is important
  customProperties: function(options) { return require("postcss-custom-properties")(options) },
  calc: function(options) { return require("postcss-calc")(options)},
  customMedia: function(options) { return require("postcss-custom-media")(options)},
  mediaQueriesRange: function(options) { return require("postcss-media-minmax")(options)},
  customSelectors: function(options) { return require("postcss-custom-selectors")(options)},
  colorRebeccapurple: function(options) { return require("postcss-color-rebeccapurple")(options)},
  colorHwb: function(options) { return require("postcss-color-hwb")(options)},
  colorGray: function(options) { return require("postcss-color-gray")(options)},
  colorHexAlpha: function(options) { return require("postcss-color-hex-alpha")(options)},
  colorFunction: function(options) { return require("postcss-color-function")(options)},
  fontVariant: function(options) { return require("postcss-font-variant")(options)},
  filter: function(options) { return require("pleeease-filters")(options)},
  autoprefixer: function(options) { return require("autoprefixer-core")(options).postcss}
}

/**
 * Expose cssnext
 *
 * @type {Function}
 */
module.exports = cssnext

/**
 * Process a CSS `string`
 *
 * @param {String} string (optional)
 * @param {Object} options (optional)
 * @return {String} if string is given, or {Object} (postcss instance)
 */
function cssnext(string, options) {
  if (arguments.length === 0) {
    options = {}
  }
  if (arguments.length === 1 && typeof string === "object") {
    options = string
    string = undefined
  }
  else {
    options = options || {}
  }

  options = assign({}, options)

  var features = options.features || {}

  // default sourcemap
  // if `map` option is passed, `sourcemap` option is ignored
  // if `sourcemap` option is passed, a inline map is used
  options.map = options.map || (options.sourcemap ? true : null)

  var postcss = Postcss()

  // only enable import & url if fs module is available
  var fs = require("fs")
  if (fs && fs.readFile) {
    // @import
    if (options.import !== false) {
      postcss.use(require("postcss-import")(typeof options.import === "object" ? options.import : undefined))
    }

    // url() adjustements
    if (options.url !== false) {
      postcss.use(require("postcss-url")(typeof options.url === "object" ? options.url : undefined))
    }
  }

  // features
  Object.keys(cssnext.features).forEach(function(key) {
    // if undefined, we default to assuming this feature is wanted by the user
    if (features[key] !== false) {
      postcss.use(cssnext.features[key](typeof features[key] === "object" ? features[key] : undefined))
    }
  })

  // minification
  if (options.compress) {
    var csswring = require("csswring")
    postcss.use(typeof options.compress === "object" ? csswring(options.compress) : csswring)
  }

  // classic API if string is passed
  if (typeof string === "string") {
    var result = postcss.process(string, options)

    // default behavior, cssnext returns a css string if no or inline sourcemap
    if (options.map === null || (options.map === true || options.map.inline)) {
      return result.css
    }

    // if a specific map has been asked, we are returning css + map
    return result
  }
  // or return the postcss instance that can be consumed as a postcss plugin
  else {
    return postcss
  }
}

/**
 * Expose cssnext features
 *
 * @type {Object}
 */
cssnext.features = features
