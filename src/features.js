export default {
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
    return require("autoprefixer-core")(options)
  },
}
