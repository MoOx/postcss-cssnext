/**
 * Modules dependencies
 */
var Postcss = require("postcss")

var features = {
  import:               function(options) { return require("postcss-import")(options) },
  customProperties:     function(options) { return require("postcss-custom-properties")(options) },
  calc:                 function(options) { return require("postcss-calc")(options)},
  customMedia:          function(options) { return require("postcss-custom-media")(options)},
  colorRebeccapurple:   function(options) { return require("postcss-color-rebeccapurple")(options)},
  colorHwb:             function(options) { return require("postcss-color-hwb")(options)},
  colorGray:            function(options) { return require("postcss-color-gray")(options)},
  colorHexAlpha:        function(options) { return require("postcss-color-hex-alpha")(options)},
  colorFunction:        function(options) { return require("postcss-color-function")(options)},
  fontVariant:          function(options) { return require("postcss-font-variant")(options)},
  prefixes:             function(options) { return require("autoprefixer-core")(options).postcss}
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

  var features = options.features || {}

  // default sourcemap
  // if `map` option is passed, `sourcemap` option is ignored
  // if `sourcemap` option is passed, a default map is used (insert content in the output)
  var defaultMap = {
    inline: true,
    sourcesContent: true
  }
  options.map = options.map || (options.sourcemap ? defaultMap : null)

  var postcss = Postcss()

  Object.keys(cssnext.features).forEach(function(key) {
    // if undefined, we use consider feature is wanted (default behavior)
    if (features[key] !== false) {
      postcss.use(cssnext.features[key](typeof features[key] === "object" ? features[key] : undefined))
    }
  })

  // simple minifier plugin
  if (options.compress) {
    postcss.use(require("csswring").postcss)
  }

  if (string) {
    var result = postcss.process(string, options)

    // default behavior, cssnext returns a css string
    if (options.map === null || options.map === defaultMap) {
      return result.css
    }

    // if a specific map has been asked, we are returning css + map
    return result
  }
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
