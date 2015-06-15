/**
 * Module dependencies
 */
const fs = require("fs")
const cssnext = require("../..")

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
 * get fixture path
 * @param {String} name
 * @param {String} ext (optional extension, default to ".css")
 * @return the fixture filename
*/
function fixturePath(name, ext) {
  ext = (ext !== undefined ? ext : ".css")
  return "src/__tests__/fixtures/" + name + ext
}

/**
 * Remove a fixture by `filename`.
 *
 * @param {String} filename
 */
function remove(filename) {
  const file = fixturePath(filename)
  if (!fs.existsSync(file)) {
    return
  }
  fs.unlinkSync(file)
}

/**
 * read a fixture
 * @param {String} name
 * @param {String} ext (optional extension, default to ".css")
 * @return the fixture content
 */
function readFixture(name, ext) {
  return fs.readFileSync(fixturePath(name, ext), "utf8")
}

/**
 * compare fixtures input with expected output
 * @param {Object} t                tape test helper
 * @param {String} name             eg: "cases/color"
 * @param {String} message          message for tape helper
 * @param {Object|Function} options cssnext options
 */
function compareFixtures(t, name, message, options) {
  let actual
  if (typeof options === "function") {
    actual = options(readFixture(name))
  }
  else {
    options = options || {}
    options.from = fixturePath(name)
    actual = cssnext(readFixture(name), options)
  }

  // handy thing: checkout actual in the *.actual.css file
  fs.writeFile(fixturePath(name + ".actual"), actual)

  const expected = readFixture(name + ".expected")

  return t.equal(
    actual.trim(),
    expected.trim(),
    message !== undefined
      ? message
      : "processed fixture '" + name + "' should be equal to expected output"
  )
}

/**
 * Exposes functions
 *
 * @type {Object}
 */
module.exports = {
  contains: contains,
  remove: remove,
  compareFixtures: compareFixtures,
  fixturePath: fixturePath,
  readFixture: readFixture,
}
