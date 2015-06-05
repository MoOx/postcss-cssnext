// Some features might affect others (eg: var() in a calc()
// in order to prevent issue, the map contains a sort of dependencies list
//
// null == always enable (& no caniuse data)
export default {
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
