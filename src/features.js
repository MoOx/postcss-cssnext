export default {
  // Reminder: order is important
  customProperties(options) {
    return require("postcss-custom-properties")(options)
  },
  calc(options) {
    return require("postcss-calc")(options)
  },
  customMedia(options) {
    return require("postcss-custom-media")(options)
  },
  mediaQueriesRange(options) {
    return require("postcss-media-minmax")(options)
  },
  customSelectors(options) {
    return require("postcss-custom-selectors")(options)
  },
  colorRebeccapurple(options) {
    return require("postcss-color-rebeccapurple")(options)
  },
  colorHwb(options) {
    return require("postcss-color-hwb")(options)
  },
  colorGray(options) {
    return require("postcss-color-gray")(options)
  },
  colorHexAlpha(options) {
    return require("postcss-color-hex-alpha")(options)
  },
  colorFunction(options) {
    return require("postcss-color-function")(options)
  },
  fontVariant(options) {
    return require("postcss-font-variant")(options)
  },
  filter(options) {
    return require("pleeease-filters")(options)
  },
  rem(options) {
    return require("pixrem")(options)
  },
  pseudoElements(options) {
    return require("postcss-pseudoelements")(options)
  },
  pseudoClassMatches(options) {
    return require("postcss-selector-matches")(options)
  },
  pseudoClassNot(options) {
    return require("postcss-selector-not")(options)
  },
  pseudoClassAnyLink(options) {
    return require("postcss-pseudo-class-any-link")(options)
  },
  colorRgba(options) {
    return require("postcss-color-rgba-fallback")(options)
  },
  autoprefixer(options) {
    return require("autoprefixer-core")(options)
  },
}
