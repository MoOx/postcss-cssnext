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
  colorHexAlpha:        function(options) { return require("postcss-color-hex-alpha")(options)},
  colorFunction:        function(options) { return require("postcss-color-function")(options)},
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
 * @param {String} string
 * @param {Object} options
 * @return {String}
 */
function cssnext(string, options) {
  // ensure options is an object
  options = options || {}
  var features = options.features || {}

  // default sourcemap
  // if `map` option is passed, `sourcemap` option is ignored
  // if `sourcemap` option is passed, a default map is used (insert content in the output)
  options.map = options.map ||
    (
      options.sourcemap ?
        {
          inline: true,
          sourcesContent: true
        } :
        null
    )

  var postcss = Postcss()

  Object.keys(cssnext.features).forEach(function(key) {
    // if undefined, we use consider feature is wanted (default behavior)
    if (features[key] !== false) {
      postcss.use(cssnext.features[key](options))
    }
  })

  // simple minifier plugin
  if (options.compress) {
    postcss.use(require("csswring").postcss)
  }

  return postcss.process(string, options).css
}

/**
 * Expose cssnext features
 *
 * @type {Object}
 */
cssnext.features = features
