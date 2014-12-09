/**
 * Module dependencies
 */
var fs = require("fs")
var path = require("path")
var cssnext = require("../..")

/**
 * Exposes functions
 *
 * @type {Object}
 */
module.exports = {
  resolve: resolve,
  read: read,
  contains: contains,
  remove: remove,
  compareFixtures: compareFixtures
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

/**
 * compare fixtures input with expected output
 * @param {Object} t                tape test helper
 * @param {String} name             eg: "cases/color"
 * @param {String} message          message for tape helper
 * @param {Object|Function} options cssnext options
 */
function compareFixtures(t, name, message, options) {
  function fixturePath(name) {
    return "test/" + name + ".css"
  }

  function fixture(name) {
    return fs.readFileSync(fixturePath(name), "utf8").trim()
  }

  var actual
  if (typeof options === "function") {
    actual = options(fixture(name))
  }
  else {
    options = options || {}
    options.from = fixturePath(name)
    actual = cssnext(fixture(name), options)
  }

  // handy thing: checkout actual in the *.actual.css file
  fs.writeFile(fixturePath(name + ".actual"), actual)

  var expected = fixture(name + ".expected")
  return t.equal(actual.trim(), expected.trim(), message !== undefined ? message : "processed fixture '" + name + "' should be equal to expected output")
}
