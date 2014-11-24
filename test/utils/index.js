/**
 * Module dependencies
 */
var fs = require("fs")
var path = require("path")

/**
 * Exposes functions
 *
 * @type {Object}
 */
module.exports = {
  resolve: resolve,
  read: read,
  contains: contains,
  remove: remove
}

/**
 * Resolve a fixture by `filename`.
 *
 * @param {String} filename
 * @return {String}
 */

function resolve(filename, ext) {
  ext = (ext !== undefined ? ext : ".css")
  return path.resolve(__dirname, "..", filename + ext)
}

/**
 * Read a fixture by `filename`.
 *
 * @param {String} filename
 * @return {String}
 */

function read(filename, ext) {
  return fs.readFileSync(resolve(filename, ext), "utf8")
}

/**
 * Check if a string is contained into another
 *
 * @param  {String}  string string to look into
 * @param  {String}  piece  string to find
 * @return {Boolean}        returns true if piece is contained in string
 */
function contains(string, piece) {
  return Boolean(string.indexOf(piece) + 1)
}

/**
 * Remove a fixture by `filename`.
 *
 * @param {String} filename
 */
function remove(filename) {
  var file = resolve(filename)
  if (!fs.existsSync(file)) {
    return
  }
  fs.unlinkSync(file)
}
