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
   * read a fixture browsers
   * @param {String} name
   * @return the fixture browsers string
   */
  readFixtureBrowsers(name) {
    const filePath = this.fixturePath(name, ".browsers")
    const exists = fs.existsSync(filePath)
    return exists && fs.readFileSync(filePath, "utf8").split("\n")[0].trim()
  },

  /**
   * write a result
   * @param {String} name
   * @param {String} content
   */
  write(name, content) {
    fs.writeFileSync(name, content)
  },
}
