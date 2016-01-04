---
title: Using postcss-cssnext
subtitle: How to configure postcss-cssnext options
---

@[toc]

When you have correctly [setup](/setup/) cssnext, you might want to tweak it a
little bit. You will find below all the available **options**.

## `browsers`

_(default:
[browserslist default](https://github.com/ai/browserslist#readme)
`> 1%, last 2 versions, Firefox ESR, Opera 12.1`)_

Allows you to specify your browser scope.
**This option enables or disables `features` according to
[caniuse](http://caniuse.com/) database.**
This is the exact same option that you might know from Autoprefixer.
Since cssnext includes Autoprefixer, the option is propagated.

See [Browserslist](https://github.com/ai/browserslist#queries) queries syntax to
adjust this option to your needs.

_Note: if you don't specify this option, Browserslist will automatically try to
find a `browserslist` config file or use its default value._

## `features`

_(default: all features depending on your `browsers` options)_

**You should probably use `browsers` option instead of this one.**

Object containing key of features to enable/disable.
_Features are enabled by default: no key means feature is enabled_.

```js
//eg: disable custom properties support
var output = cssnext(input, {
  features: {
    customProperties: false
  }
})
```

Each feature is based on PostCSS plugins & can get its own options.
To pass options to a feature, you can just pass an object to the feature:

```js
//eg: pass variables
var output = cssnext(input, {
  features: {
    customProperties: {
      variables: {
        mainColor: "red",
        altColor: "blue",
      }
    }
  }
})
```

To know all available options, please check corresponding postcss plugin:

- `customProperties`
[(=> postcss-custom-properties)](https://www.npmjs.com/package/postcss-custom-properties)
- `calc`
[(=> postcss-calc)](https://www.npmjs.com/package/postcss-calc)
- `customMedia`
[(=> postcss-custom-media)](https://www.npmjs.com/package/postcss-custom-media)
- `mediaQueriesRange`
[(=> postcss-media-minmax)](https://www.npmjs.com/package/postcss-media-minmax)
- `customSelectors`
[(=> postcss-custom-selectors)](https://www.npmjs.com/package/postcss-custom-selectors)
- `colorRebeccapurple`
[(=> postcss-color-rebeccapurple)](https://www.npmjs.com/package/postcss-color-rebeccapurple)
- `colorHwb`
[(=> postcss-color-hwb)](https://www.npmjs.com/package/postcss-color-hwb)
- `colorGray`
[(=> postcss-color-gray)](https://www.npmjs.com/package/postcss-color-gray)
- `colorHexAlpha`
[(=> postcss-color-hex-alpha)](https://www.npmjs.com/package/postcss-color-hex-alpha)
- `colorFunction`
[(=> postcss-color-function)](https://www.npmjs.com/package/postcss-color-function)
- `fontVariant`
[(=> postcss-font-variant)](https://www.npmjs.com/package/postcss-font-variant)
- `filter`
[(=> pleeease-filters)](https://www.npmjs.com/package/pleeease-filters)
- `rem`
[(=> pixrem)](https://www.npmjs.com/package/pixrem)
- `pseudoElements`
[(=> postcss-pseudoelements)](https://www.npmjs.com/package/postcss-pseudoelements)
- `pseudoClassMatches`
[(=> postcss-selector-matches)](https://www.npmjs.com/package/postcss-selector-matches)
- `pseudoClassNot`
[(=> postcss-selector-not)](https://www.npmjs.com/package/postcss-selector-not)
- `colorRgba`
[(=> postcss-color-rgba-fallback)](https://www.npmjs.com/package/postcss-color-rgba-fallback)
- `autoprefixer`
[(=> autoprefixer-core)](https://www.npmjs.com/package/autoprefixer-core)

_Note: order is important to get everything working correctly._
