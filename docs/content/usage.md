---
title: Using cssnext
subtitle: How to configure cssnext options
incomplete: true
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

## `import`

_(default: `true`)_

Allows you to inline local `@import` files
(thanks to [postcss-import](https://github.com/postcss/postcss-import#readme)):

* you can refer to
  * `node_modules` packages
  * `web_modules` packages
  * `bower_components` packages
  * local packages or files
* for packages, this will automatically
  * look for `"style"` entry in `package.json`
  * or will try to call `index.css`
* you can omit `.css` extension of filename

_Note: you can pass
[postcss-import options](https://github.com/postcss/postcss-import#readme)
directly if needed._

## `url`

_(default: `true`)_

By default, `url()` are rebased according to `from` (and `to`) option(s).
This is convenient especially for `@import`ed files.

_Note: you can pass
[postcss-url options](https://github.com/postcss/postcss-url#options)
directly in order to inline or have more control over urls._

## `plugins`

_(default: `[]`)_

Allows you to pass your own array of transformations. You can just pass your own
[PostCSS](https://github.com/postcss/postcss) plugins.

```js
{
  plugins: [
    require("postcss-stuff"),
    require("postcss-more-stuff"),
    // custom transformation code
    function(cssAst, result) {
      // see https://github.com/postcss/postcss
    },
  ],
}
```

## `compress`

_(default: `false`)_

Allows you to compress the output
(using [cssnano](https://github.com/ben-eb/cssnano)).
You can enable minification by passing `true` or by providing an object
containing [cssnano options](http://cssnano.co/options/).

## `messages`

_(default: `true`)_

Allows you to show/hide some warnings messages.
Passing a boolean will enable/disable messages on all interfaces
(console + browser).
You can also pass a object to enable or disable some interfaces only:


```js
{
  messages: {
    // if you want only messages in CSS
    browser: true

    // if you want only messages in console
    console: true,
  }
}
```

By default, messages are removed when they have been displayed.
If you want, you can pass option to the PostCSS plugins used

```js
{
  messages: {
    browser: {
      // see https://github.com/postcss/postcss-messages
    }

    console: {
      // see https://github.com/postcss/postcss-reporter
    },
  }
}
```

## `sourcemap`

_(default: `false`)_

This option is a shortcut to enable inlined sourcemap in the output.
Just pass `true` to get the sourcemap at the end of the output.

- _If you want an accurate sourcemap, please also use the `from` option._
- _If you want more control on the sourcemap, please use the `map` option
instead._

## `map`

_(default: _depends on `sourcemap`: `undefined` if `sourcemap` is `false`,
`inline` if `sourcemap` it true)__

If you want better control on sourcemap, you are at the right place.
This is the
[postcss `map` option](https://github.com/postcss/postcss#source-map),
so checkout the related documentation directly.

_If you specify this option, `sourcemap` value will be ignored._

**`/!\` Using this option might change the return value of `cssnext()` (`object`
instead of css `string` if map is not inlined. The object will be like
`{css: "{css string}", map: {sourcemap object}})`**

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
