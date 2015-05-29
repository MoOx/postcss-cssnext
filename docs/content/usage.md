---
title: How to use cssnext ?
incomplete: true
---

When you have correctly [setup](/setup/) cssnext, you might want to tweak it a
little bit. You will find below all the available options.

# Options

## `browsers`

(default: [browserslist default](https://github.com/ai/browserslist#readme) - `> 1%, last 2 versions, Firefox ESR, Opera 12.1`)

Allows you to specify your browser scope.
**This option enables or disables `features` according to [caniuse](http://caniuse.com/) database.**
This is the exact same option that you might know from Autoprefixer.
Since cssnext includes Autoprefixer, the option is propagated.

See [Browserslist](https://github.com/ai/browserslist#queries) queries syntax to adjust this option to your needs.

_Note: if you don't specify this option, Browserslist will automatically try to find a `browserslist`
config file or use its default value._

## `features`

(default: all features)

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
//eg: preserve custom properties
var output = cssnext(input, {
  features: {
    customProperties: {
      preserve: true
    }
  }
})
```

To know all available options, please check corresponding postcss plugin:

- `customProperties` (=> postcss-custom-properties)
- `calc` (=> postcss-calc)
- `customMedia` (=> postcss-custom-media)
- `mediaQueriesRange` (=> postcss-media-minmax)
- `customSelectors` (=> postcss-custom-selectors)
- `colorRebeccapurple` (=> postcss-color-rebeccapurple)
- `colorHwb` (=> postcss-color-hwb)
- `colorGray` (=> postcss-color-gray)
- `colorHexAlpha` (=> postcss-color-hex-alpha)
- `colorFunction` (=> postcss-color-function)
- `fontVariant` (=> postcss-font-variant)
- `filter` (=> pleeease-filters)
- `rem` (=> pixrem)
- `pseudoElements` (=> postcss-pseudoelements)
- `pseudoClassMatches` (=> postcss-selector-matches)
- `pseudoClassNot` (=> postcss-selector-not)
- `colorRgba` (=> postcss-color-rgba-fallback)
- `autoprefixer` (=> autoprefixer-core)

_Note: order is important to get everything working correctly._

## `import`

(default: `true`)

Allows you to inline local `@import` files (thanks to [postcss-import](https://github.com/postcss/postcss-import#readme)):

* you can refer to `node_modules` and `web_modules` packages
* you can omit .css extension

_Note: you can pass [postcss-import options](https://github.com/postcss/postcss-import#readme) directly._

## `url`

(default: `true`)

By default, `url()` are rebased according to `from` (and `to`) option(s). This is convenient especially for `@import`ed files.

_Note: you can pass [postcss-url options](https://github.com/postcss/postcss-url#options) directly in order to inline or have more control over urls._

## `compress`

(default: `false`)

Allows you to compress the output (using [cssnano](https://github.com/ben-eb/cssnano)).
You can enable minification by passing `true` or by providing an object containing [cssnano options](https://github.com/ben-eb/cssnano#options).

## `sourcemap`

(default: `false`)

This option is a shortcut to enable inlined sourcemap in the output.
Just pass `true` to get the sourcemap at the end of the output.

- _If you want an accurate sourcemap, please also use the `from` option._
- _If you want more control on the sourcemap, please use the `map` option instead._

## `map`

(default: _depends on `sourcemap`_)

_(default: `undefined` if `sourcemap` is `false`, `inline` if `sourcemap` it true)_

If you want better control on sourcemap, you are at the right place.
This is the [postcss `map` option](https://github.com/postcss/postcss#source-map-1), so checkout the related documentation directly.

_If you specify this option, `sourcemap` value will be ignored._

**`/!\` Using this option might change the return value of `cssnext()` (`object` instead of css `string` if map is not inlined. The object will be like {css: "{css string}", map: {sourcemap object}})**

## `from`

(default: `null`)

Source of the file. Required for accurate sourcemap.

```js
var cssnext = require("cssnext")
var fs = require("fs")

var source = "./index.css"
var output = cssnext(
  fs.readFileSync(source, "utf8"),
  {from: source}
)
fs.writeFileSync("dist/index.css", output)
```
