/**
 * Modules dependencies
 */
var Postcss = require("postcss")

var features = {
  import:           function(options) { return require("postcss-import")(options) },
  customProperties: function(options) { return require("postcss-custom-properties")(options) },
  calc:             function(options) { return require("postcss-calc")(options)},
  customMedia:      function(options) { return require("postcss-custom-media")(options)},
  color:            function(options) { return require("postcss-color")(options)},
  prefixes:         function(options) { return require("autoprefixer")(options).postcss}
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
  // if `map` option is passed, sourcemap option is ignored
  // if `sourcemap` option is passed, a default map is used (insert content in the output)
  // if `from` option is passed, we assume sourcemap is wanted
  options.map = options.map ||
    (
      (options.sourcemap || (options.sourcemap !== false && options.from)) ?
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

  return postcss.process(string, options).css
}

/**
 * Expose cssnext features
 *
 * @type {Object}
 */
cssnext.features = features
