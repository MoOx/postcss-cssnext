/**
 * Modules dependencies
 */
var postcss = require("postcss")

/**
 * Process a CSS `string`
 *
 * @param {String} string
 * @param {Object} options
 * @return {String}
 */
module.exports = function cssnext(string, options) {
  // ensure options is an object
  options = options || {}

  return postcss()
    .process(string, options)
    .css
}
