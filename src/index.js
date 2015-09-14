import postcss from "postcss"
import { isSupported } from "caniuse-api"

import libraryFeatures from "./features"
import featuresActivationMap from "./features-activation-map"

const plugin = postcss.plugin("postcss-cssnext", (options) => {
  options = {
    features: {},
    // options.browsers is deliberately undefined by default to inherit
    // browserslist default behavior
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

  const processor = postcss()

  // features
  Object.keys(libraryFeatures).forEach(key => {
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
      const plugin = libraryFeatures[key](
        typeof features[key] === "object"
          ? { ...features[key] }
          : undefined
        )
      processor.use(plugin)
    }
  })

  return processor
})

// according to the way babel transpile es6 module
// we cannot use the following syntax to export features
//
// export { libraryFeatures as features }
//
// babel only add `module.exports = exports["default"];` if there is only one
// thing exported
// so we add `features` as a plugin property
plugin.features = libraryFeatures

export default plugin
