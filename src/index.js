import fs from "fs"

import postCSS from "postcss"
import {isSupported} from "caniuse-api"

import fixes from "./fixes"

import postcssCssNext from "postcss-cssnext"

import optionMessages from "./option.messages"

/**
 * Process a CSS `string`
 *
 * @param {String} string (optional)
 * @param {Object} options (optional)
 * @return {String} if string is given, or {Object} (postcss instance)
 */
function cssnext(string, options) {
  // prevent usage as a webpack loader
  // webpack run loader as function with an object as context
  // this object contains a "webpack" key set to true if used as a loader
  // https://github.com/cssnext/cssnext/issues/61
  if (typeof this === "object" && this.webpack === true) {
    throw new Error(
      "⚠︎ Don't use directly cssnext as a webpack loader. " +
      "Please use `cssnext-loader` instead: " +
      "https://github.com/cssnext/cssnext-loader"
    )
  }

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

  options = {
    features: {},
    // options.browsers is deliberately undefined by defaut to inherit
    // browserslist default behavior
    // default sourcemap
    // if `map` option is passed, `sourcemap` option is ignored
    // if `sourcemap` option is passed, a inline map is used
    map: (options.sourcemap ? true : null),
    messages: true,
    ...options,
  }

  const postcss = postCSS()

  // only enable import & url if fs module is available
  if (fs && fs.readFile) {
    // @import
    if (options.import !== false) {
      const plugin = require("postcss-import")(
        typeof options.import === "object"
          ? {...options.import}
          : undefined
        )
      postcss.use(plugin)
    }

    // url() adjustements
    if (options.url !== false) {
      const plugin = require("postcss-url")(
        typeof options.url === "object"
          ? {...options.url}
          : undefined
        )
      postcss.use(plugin)
    }
  }

  // tmp fixes
  Object.keys(fixes).forEach(key => postcss.use(fixes[key]))

  const postcssCssNextOptions = {features: options.features}
  if (options.browsers) {
    postcssCssNextOptions.browsers = options.browsers
  }
  postcss.use(postcssCssNext(postcssCssNextOptions))

  if (options.plugins) {
    if (!Array.isArray(options.plugins)) {
      throw new Error(
        "cssnext 'plugins' option expect an array of PostCSS plugins. " +
        "You provided " + (typeof options.plugins)
      )
    }

    options.plugins.forEach(plugin => postcss.use(plugin))
  }

  // minification
  if (options.compress) {
    postcss.use(
      require("cssnano")(
        typeof options.compress === "object"
        ? options.compress
        : {}
      )
    )
  }

  // console plugins MUST be called after others because
  // by default it remove messages from the registry
  // (which make sense)
  if (options.messages) {
    optionMessages(options).forEach(plugin => {
      postcss.use(plugin)
    })
  }

  // classic API if string is passed
  if (typeof string === "string") {
    const result = postcss.process(string, options)

    // default behavior, cssnext returns a css string if no or inline sourcemap
    if (options.map === null || (options.map === true || options.map.inline)) {
      return result.css
    }

    // if a specific map has been asked, we are returning css + map
    return result
  }
  // or return the postcss instance that can be consumed as a postcss plugin
  else {
    return postcss
  }
}

/**
 * Expose cssnext features
 *
 * @type {Object}
 */
cssnext.features = postcssCssNext.features

/**
 * Expose cssnext
 *
 * @type {Function}
 */
module.exports = cssnext
