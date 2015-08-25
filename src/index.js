import fs from "fs"

import postCSS from "postcss"
import {isSupported} from "caniuse-api"

import fixes from "./fixes"

import libraryFeatures from "./features"
import featuresActivationMap from "./features-activation-map"

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

  const features = options.features

  // propagate browsers option to autoprefixer
  if (features.autoprefixer !== false) {
    features.autoprefixer = {
      browsers: (
        features.autoprefixer && features.autoprefixer.browsers
          ? features.autoprefixer.browsers
          : options.browsers
      ),
      ...(features.autoprefixer || {}),
    }

    // autoprefixer doesn't like an "undefined" value. Related to coffee ?
    if (features.autoprefixer.browsers === undefined) {
      delete features.autoprefixer.browsers
    }
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

  // features
  Object.keys(cssnext.features).forEach(key => {
    // feature is auto enabled if: not disable && (enabled || no data yet ||
    // !supported yet)
    if (
      // feature is not disabled
      features[key] !== false &&
      (
        // feature is enabled
        features[key] === true ||

        // feature don't have any browsers data (yet)
        featuresActivationMap[key] === undefined ||

        // feature is not yet supported by the browsers scope
        (
          featuresActivationMap[key] &&
          featuresActivationMap[key][0] &&
          !isSupported(featuresActivationMap[key][0], options.browsers)
        )
      )
    ) {
      const plugin = cssnext.features[key](
        typeof features[key] === "object"
          ? {...features[key]}
          : undefined
        )
      postcss.use(plugin)
    }
  })

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
cssnext.features = libraryFeatures

/**
 * Expose cssnext
 *
 * @type {Function}
 */
module.exports = cssnext
