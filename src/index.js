import postCSS from "postcss"
import {isSupported} from "caniuse-api"

import libraryFeatures from "./features"
import featuresActivationMap from "./features-activation-map"

import postcssMessagesConsole from "postcss-log-warnings"
import postcssMessagesCSS from "postcss-messages"

/**
 * Process a CSS `string`
 *
 * @param {String} string (optional)
 * @param {Object} options (optional)
 * @return {String} if string is given, or {Object} (postcss instance)
 */
function cssnext(string, options) {
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

  options = {...options}

  var features = options.features || {}

  // options.browsers is deliberately undefined by defaut to inherit
  // browserslist default behavior

  // default sourcemap
  // if `map` option is passed, `sourcemap` option is ignored
  // if `sourcemap` option is passed, a inline map is used
  options.map = options.map || (options.sourcemap ? true : null)

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

  var postcss = postCSS()

  // only enable import & url if fs module is available
  var fs = require("fs")
  if (fs && fs.readFile) {
    // @import
    if (options.import !== false) {
      postcss.use(require("postcss-import")(
        typeof options.import === "object"
          ? {...options.import}
          : undefined
        )
      )
    }

    // url() adjustements
    if (options.url !== false) {
      postcss.use(require("postcss-url")(
        typeof options.url === "object"
          ? {...options.url}
          : undefined
        )
      )
    }
  }

  // features
  Object.keys(cssnext.features).forEach(function(key) {
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
      postcss.use(cssnext.features[key](
        typeof features[key] === "object"
          ? {...features[key]}
          : undefined
        )
      )
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
    var nano = require("cssnano")
    postcss.use(
      nano({
        ...(
          typeof options.compress === "object"
          ? options.compress
          : {}
        ),
        // forced calc options to false
        // since we already used it
        calc: false,
      })
    )
  }

  if (options.messages) {
    // console plugins MUST be called after others because
    // by default it remove messages from the registry
    // (which make sense)
    const messagesPlugins = (
      // true === all interfaces
      options.messages === true
      ? [
        postcssMessagesCSS,
        postcssMessagesConsole,
      ]
      : (
        // object: only the one you want
        typeof options.messages === "object"
        ? [
          ...options.messages.css
            ? [
              postcssMessagesCSS(
                typeof options.messages.css === "object"
                ? {...options.messages.css}
                : undefined
              ),
            ]
            : [],
          ...options.messages.console
            ? [
              postcssMessagesConsole(
                typeof options.messages.console === "object"
                ? {...options.messages.console}
                : undefined
              ),
            ]
            : [],
        ]
        // otherwise nothing :)
        : []
      )
    )
    messagesPlugins.forEach(plugin => {
      postcss.use(plugin)
    })
  }

  // classic API if string is passed
  if (typeof string === "string") {
    var result = postcss.process(string, options)

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
