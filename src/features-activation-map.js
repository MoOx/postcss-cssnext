// Some features might affect others (eg: var() in a calc()
// in order to prevent issue, the map contains a sort of dependencies list
//
// null == always enable (& no caniuse data)
export default {
  customProperties: [ "css-variables" ],
  // applyRule: [ null ],
  // calc() transformation only make sense with transformed custom properties,
  // don't you think ?
  // calc: [ null ],
  // nesting: [ null ],
  // @todo open PR on caniuse repo https://github.com/Fyrd/caniuse
  // customMedia: [ null ],
  // mediaQueriesRange: [ null ],
  // customSelectors: [ null ],
  attributeCaseInsensitive: [ "css-case-insensitive" ],
  colorRebeccapurple: [ "css-rebeccapurple" ],
  // colorHsl: [ null ],
  // colorHwb: [ null ],
  // colorRgb: [ null ],
  // colorGray: [ null ],
  colorHexAlpha: [ "css-rrggbbaa" ],
  // colorFunction:[ null],
  // fontVariant: [ null ],
  // @todo can be done using a callback, this is only used for Firefox < 35
  filter: [ "css-filters" ],
  initial: [ "css-all", "css-initial-value" ],
  rem: [ "rem" ],
  pseudoElements: [ "css-gencontent" ],
  pseudoClassMatches: [ "css-matches-pseudo" ],
  pseudoClassNot: [ "css-not-sel-list" ],
  // pseudoClassAnyLink: [ null ],
  colorRgba: [ "css3-colors" ],
  overflowWrap: [ "wordwrap" ],
  imageSet: [ "css-image-set" ],
  // will always be null since autoprefixer does the same game as we do
  // autoprefixer: [ null ]
}
