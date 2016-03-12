/**
 * Module dependencies
 */
import fs from "fs"
import { join } from "path"

/**
 * Exposes functions
 *
 * @type {Object}
 */
export default {
  /**
   * get fixture path
   * @param {String} name
   * @param {String} ext (optional extension, default to ".css")
   * @return the fixture filename
   */
  fixturePath(name, ext) {
    ext = (ext !== undefined ? ext : ".css")
    return join("src", "__tests__", "fixtures", name + ext)
  },

  /**
   * read a fixture
   * @param {String} name
   * @param {String} ext (optional extension, default to ".css")
   * @return the fixture content
   */
  readFixture(name, ext) {
    return fs.readFileSync(this.fixturePath(name, ext), "utf8")
  },

  /**
   * read a fixture
   * @param {String} name
   * @param {String} ext (optional extension, default to ".css")
   * @return the fixture content
   */
  write(name, content) {
    return fs.writeFileSync(name, content)
  },
}
