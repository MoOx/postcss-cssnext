/**
 * Modules dependencies
 */
var postcss = require("postcss")
var assign = require("object-assign")
var caniuse = require("caniuse-api")

// Some features might affect others (eg: var() in a calc()
// in order to prevent issue, the map contains a sort of dependencies list
//
// null == always enable (& no caniuse data)
var caniuseFeaturesMap = {
  customProperties: ["css-variables"],
  // calc() transformation only make sense with transformed custom properties,
  // don't you think ?
  // calc: null,
  // @todo open PR on caniuse repo https://github.com/Fyrd/caniuse
  // customMedia: [null],
  // mediaQueriesRange: [null],
  // customSelectors: [null],
  // colorRebeccapurple: [null], // @todo can be done easily
  // colorHwb: [null],
  // colorGray: [null],
  // colorHexAlpha: [null],
  // colorFunction:[null],
  // fontVariant: [null],
  // @todo can be done using a callback, this is only used for Firefox < 35
  // filter: [null],
  rem: ["rem"],
  pseudoElements: ["css-gencontent"],
  // pseudoClassMatches: [null],
  // pseudoClassNot: [null],
  colorRgba: ["css3-colors"],
  // will always be null since autoprefixer does the same game as we do
  // autoprefixer: [null]
}

var libraryFeatures = {
  // Reminder: order is important
  customProperties: function(options) {
    return require("postcss-custom-properties")(options)
  },
  calc: function(options) {
    return require("postcss-calc")(options)
  },
  customMedia: function(options) {
    return require("postcss-custom-media")(options)
  },
  mediaQueriesRange: function(options) {
    return require("postcss-media-minmax")(options)
  },
  customSelectors: function(options) {
    return require("postcss-custom-selectors")(options)
  },
  colorRebeccapurple: function(options) {
    return require("postcss-color-rebeccapurple")(options)
  },
  colorHwb: function(options) {
    return require("postcss-color-hwb")(options)
  },
  colorGray: function(options) {
    return require("postcss-color-gray")(options)
  },
  colorHexAlpha: function(options) {
    return require("postcss-color-hex-alpha")(options)
  },
  colorFunction: function(options) {
    return require("postcss-color-function")(options)
  },
  fontVariant: function(options) {
    return require("postcss-font-variant")(options)
  },
  filter: function(options) {
    return require("pleeease-filters")(options)
  },
  rem: function(options) {
    return require("pixrem")(options)
  },
  pseudoElements: function(options) {
    return require("postcss-pseudoelements")(options)
  },
  pseudoClassMatches: function(options) {
    return require("postcss-selector-matches")(options)
  },
  pseudoClassNot: function(options) {
    return require("postcss-selector-not")(options)
  },
  colorRgba: function(options) {
    return require("postcss-color-rgba-fallback")(options)
  },
  autoprefixer: function(options) {
    return require("autoprefixer-core")(options).postcss
  },
}

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

  options = assign({}, options)

  var features = options.features || {}

  // options.browsers is deliberately undefined by defaut to inherit
  // browserslist default behavior

  // default sourcemap
  // if `map` option is passed, `sourcemap` option is ignored
  // if `sourcemap` option is passed, a inline map is used
  options.map = options.map || (options.sourcemap ? true : null)

  // propagate browsers option to autoprefixer
  if (features.autoprefixer !== false) {
    features.autoprefixer = features.autoprefixer || {}
    features.autoprefixer.browsers = features.autoprefixer.browsers ||
      options.browsers

    // autoprefixer doesn't like an "undefined" value. Related to coffee ?
    if (features.autoprefixer.browsers === undefined) {
      delete features.autoprefixer.browsers
    }
  }

  var postcssInstance = postcss()

  // only enable import & url if fs module is available
  var fs = require("fs")
  if (fs && fs.readFile) {
    // @import
    if (options.import !== false) {
      postcssInstance.use(require("postcss-import")(
        typeof options.import === "object"
          ? options.import
          : undefined
        )
      )
    }

    // url() adjustements
    if (options.url !== false) {
      postcssInstance.use(require("postcss-url")(
        typeof options.url === "object"
          ? options.url
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
        caniuseFeaturesMap[key] === undefined ||

        // feature is not yet supported by the browsers scope
        (
          caniuseFeaturesMap[key] &&
          caniuseFeaturesMap[key][0] &&
          !caniuse.isSupported(caniuseFeaturesMap[key][0], options.browsers)
        )
      )
    ) {
      postcssInstance.use(cssnext.features[key](
        typeof features[key] === "object"
          ? features[key]
          : undefined
        )
      )
    }
  })

  // minification
  if (options.compress) {
    var nano = require("cssnano")
    postcssInstance.use(
      nano(
        assign(
          {},
          typeof options.compress === "object"
            ? options.compress
            : {},
          // forced calc options to false
          // since we already used it
          {calc: false}
        )
      )
    )
  }

  // classic API if string is passed
  if (typeof string === "string") {
    var result = postcssInstance.process(string, options)

    // default behavior, cssnext returns a css string if no or inline sourcemap
    if (options.map === null || (options.map === true || options.map.inline)) {
      return result.css
    }

    // if a specific map has been asked, we are returning css + map
    return result
  }
  // or return the postcss instance that can be consumed as a postcss plugin
  else {
    return postcssInstance
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
