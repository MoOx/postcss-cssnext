/**
 * Modules dependencies
 */
var Postcss = require("postcss")
var features = {
  customProperties: require("postcss-custom-properties"),
  calc: require("postcss-calc")
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
