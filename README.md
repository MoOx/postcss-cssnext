# cssnext [![NPM version](http://img.shields.io/npm/v/cssnext.svg?style=flat)](https://www.npmjs.org/package/cssnext)  [![Travis Build Status](https://img.shields.io/travis/cssnext/cssnext.svg?label=unix build)](https://travis-ci.org/cssnext/cssnext) [![AppVeyor Build Status](https://img.shields.io/appveyor/ci/MoOx/cssnext.svg?label=windows build)](https://ci.appveyor.com/project/MoOx/cssnext) [![Join the chat at https://gitter.im/cssnext/cssnext](https://img.shields.io/badge/gitter%20-join%20chat%20%E2%9E%9E-1dce73.svg)](https://gitter.im/cssnext/cssnext)


> Use tomorrow's CSS syntax, today.


This is a CSS transpiler (CSS4+ to CSS3) that allows you to use tomorrow's CSS syntax today.
It transforms CSS specs that are not already implemented in popular browsers into more compatible CSS.  

_This is not a classic CSS preprocessor, but can totally replace one._

Check out [the website](https://cssnext.github.io/) or [try cssnext](https://cssnext.github.io/cssnext-playground) in your browser.

**Is it cssnext or CSSNext or CSSnext?**

The official name is **cssnext**, which should never be capitalized, especially not at the start of a sentence, unless it is being displayed in a location that is customarily all-caps (such as the title of man pages).

---

[Why](#why) | [Features](#features) | [Limitations](#limitations) | [Installation](#installation)| [CLI Usage](#cli) | [Node.js API](#nodejs-api) | [Contribute](#contributing)
--- | --- | --- | --- | --- | --- | ---

---

## Why

Prior 2015, CSS was frustrating by not having any specification for features we were looking for. No variables, no math, no color manipulation & no customization. Things are going to change soon since a lot of work has been made by the W3C to write new specs to make our life easier.

**This project aims to allow you to use future CSS syntax, today.**

It is similar to [Myth](http://myth.io/) or [SUIT CSS preprocessor](https://github.com/suitcss/preprocessor) but pushes the concept to the next level by supporting more features. It works great with [cssrecipes](https://cssrecipes.github.io/) or [SUIT CSS](https://suitcss.github.io/).

_It's not planned for now to provide polyfills for future CSS APIs that depend on the client browser._

Follow [@cssnext on Twitter](https://twitter.com/cssnext) to get the latest news & join [#cssnext on irc.freenode.net](http://webchat.freenode.net/?channels=cssnext) if you have any questions.

## Features

You can safely use the following features:

* automatic vendor prefixes
(via [autoprefixer](https://github.com/postcss/autoprefixer)),
* [custom properties & `var()`](http://www.w3.org/TR/css-variables/)
limited to `:root`
([⇗](https://github.com/postcss/postcss-custom-properties)),
* [reduced `calc()`](https://github.com/MoOx/reduce-css-calc#readme)
to optimize previously parsed `var()` references
([⇗](https://github.com/postcss/postcss-calc)),
* [custom media queries](http://dev.w3.org/csswg/mediaqueries/#custom-mq)
a nice way to have semantic media queries
([⇗](https://github.com/postcss/postcss-custom-media)),
* [media queries ranges](http://dev.w3.org/csswg/mediaqueries/#mq-ranges)
that allows to replace min-/max- with `<=` & `>=` (syntax easier to read)
([⇗](https://github.com/postcss/postcss-media-minmax)),
* [custom selectors](http://dev.w3.org/csswg/css-extensions/#custom-selectors)
to create your own selectors
([⇗](https://github.com/postcss/postcss-custom-selector)),
* [`color()`](http://dev.w3.org/csswg/css-color/#modifying-colors)
a color function to modify colors
(transpiled to: `rgba()`)
([⇗](https://github.com/postcss/postcss-color-function)),
* [`hwb()`](http://dev.w3.org/csswg/css-color/#the-hwb-notation)
similar to `hsl()` but easier for humans to work with
(transpiled to: `rgba()`)
([⇗](https://github.com/postcss/postcss-color-hwb)) ,
* [`gray()`](http://dev.w3.org/csswg/css-color/#grays)
(transpiled to: `rgba()`)
([⇗](https://github.com/postcss/postcss-color-gray)),
* [#rrggbbaa](http://dev.w3.org/csswg/css-color/#hex-notation)
(transpiled to: `rgba()`)
([⇗](https://github.com/postcss/postcss-color-hex-alpha)),
* [`rebeccapurple`](http://dev.w3.org/csswg/css-color/#valdef-color-rebeccapurple)
([⇗](https://github.com/postcss/postcss-color-rebeccapurple)),
* [font-variant](http://dev.w3.org/csswg/css-fonts/#propdef-font-variant)
properties (fallback: `font-feature-settings`)
([⇗](https://github.com/postcss/postcss-font-variant)),
* [filter](http://www.w3.org/TR/filter-effects/)
properties (fallback: inlined `<svg>` filter)
([⇗](https://github.com/iamvdo/pleeease-filters))
* [`rem` units](http://www.w3.org/TR/css3-values/#rem-unit)
(fallback: `px`)
([⇗](https://github.com/robwierzbowski/node-pixrem))
* [pseudo-elements](http://www.w3.org/TR/css3-selectors/#pseudo-elements)
(adjust `::` to `:`)
([⇗](https://github.com/axa-ch/postcss-pseudoelements))
* [`:matches` pseudo-class](http://dev.w3.org/csswg/selectors-4/#matches)
([⇗](https://github.com/postcss/postcss-selector-matches))
* [`:not` pseudo-class](http://dev.w3.org/csswg/selectors-4/#negation)
([⇗](https://github.com/postcss/postcss-selector-NOT))
* alpha colors for browser that don't understand [css 3 colors](http://www.w3.org/TR/css3-color/)
(fallback: solid hexa colors)
([⇗](https://github.com/postcss/postcss-color-rgba-fallback))

_Note that according to your [browser scope](#nodejs-options) some might be not transpiled to avoid extra useless output._

### Bonus features

_<small>The features below are considered as bonus since it's totally not related to CSS specs</small>._

* `@import` inline local files and modules - `node_modules` or `web_modules` ([⇗](https://github.com/postcss/postcss-import)) to output a bundled CSS file. `url()` referenced are also rebased.
* minification is available ([⇗](https://github.com/hail2u/node-csswring)) if you want to compress the output for production.


### @todo

Any omissions of the CSS specifications (even in draft) that are subject to be handled by cssnext are not intentional.  
You can take a look at the [list of features that are waiting to be implemented](https://github.com/cssnext/cssnext/issues?q=is%3Aopen+is%3Aissue+label%3Afeature+label%3Aready).  
Feel free to work on a feature ready to be added, or [open a new issue](https://github.com/cssnext/cssnext/issues/new) if you find something that should be handled.  
Keep in mind that, as of right now, this project is intended to support new CSS *syntax* only.

## Limitations

### Custom properties

The current transformation for custom properties just aims to provide a future-proof way of using a **limited subset (to top-level `:root` selector)** of the features provided by native CSS custom properties.  
The transformation is not complete and can't be properly. By injecting selectors with new computed rules, we will break original cascade & unexpected results might happen.

### Font variant

`font-variant` are transformed to `font-feature-settings`. You might take a look at the support of [font feature settings](http://caniuse.com/#feat=font-feature).

### Filter

The W3C filters are only transformed as svg filter using the `url(data:*)` trick for Firefox < 35.

---

## Installation

```console
$ npm install cssnext
```

You can install it

- locally (`--save` or `--save-dev`), to use it through [npm scripts](https://www.npmjs.org/doc/misc/npm-scripts.html) (`npm run`) or via `.node_modules/.bin/cssnext`
- globally (`-g`), to use it through the [CLI](cli) (not recommanded)
- by using [other plugins & tools](#usage-with-other-tools) like [gulp-cssnext](https://github.com/cssnext/gulp-cssnext)

## Usage

You can use cssnext using [CLI](#cli),
as [a JavaScript library](#nodejs-api),
as a [PostCSS](https://github.com/postcss/postcss) plugin
or through [others tools](#usage-with-other-tools).

### CLI

cssnext offers a command-line interface.
Here's how to compile a file and print it to stdout:

```console
$ cssnext index.css
```

To create an output file, you can just add a second argument

```console
$ cssnext index.css output.css
```

Or use CLI std(in|out) redirection(s)

```console
$ cat input.css | cssnext > output.css
```

### CLI options

If you don't care about a certain feature, such as custom media queries, you can omit support for them like so:

```console
$ cssnext --no-custom-media index.css
```

To enable source maps for these files, add the `--sourcemap` flag.

**To see all CLI options**

```console
$ cssnext --help
```

### Node.js API

cssnext can be used with its own API or as a PostCSS plugin.

#### `var string = cssnext(string, options)`

cssnext accepts 2 arguments: a css string and an object of options.

```js
var fs = require("fs")
var cssnext = require("cssnext")

var input = fs.readFileSync("index.css", "utf8")

var output = cssnext(input)
fs.writeFileSync("dist/index.css", output)
```

**`/!\` Note: if you are using non inlined sourcemaps, cssnext will return an object: `{css: string, map: sourcemap}`**

See [sourcemap](#sourcemap-default-false) & [map](#map-default-depends-on-sourcemap) options for more informations.

#### `var postcssPlugin = cssnext(options)`

cssnext can be used as a postcss plugin:

```js
var fs = require("fs")
var postcss = require("postcss")
var cssnext = require("cssnext")

var input = fs.readFileSync("index.css", "utf8")

var output = postcss()
  .use(cssnext())
  .use(/* your other postcss plugin */)
  .process(input)
fs.writeFileSync("dist/index.css", output)
```

#### Node.js options

##### `browsers` (default: [browserslist default](https://github.com/ai/browserslist#readme) - `> 1%, last 2 versions, Firefox ESR, Opera 12.1`)

Allows you to specify your browser scope.
**This option enables or disables `features` according to [caniuse](http://caniuse.com/) database.**
This is the exact same option that you might know from Autoprefixer.
Since cssnext includes Autoprefixer, the option is propagated.

See [Browserslist](https://github.com/ai/browserslist#queries) queries syntax to adjust this option to your needs.

_Note: if you don't specify this option, Browserslist will automatically try to find a `browserslist`
config file or use its default value._

##### `features` (default: all features)

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

To know all available options, please check the [available features](#available) list where you will find references to all the plugins used.

Here are all the available features:

- `customProperties`
- `calc`
- `customMedia`
- `mediaQueriesRange`
- `customSelectors`
- `colorFunction`
- `colorHexAlpha`
- `colorHwb`
- `colorRebeccapurple`
- `fontVariant`
- `filter`
- `rem`
- `pseudoElements`
- `pseudoClassMatches`
- `pseudoClassNot`
- `colorRgba`
- `autoprefixer`

_Note: order is important to get everything working correctly._

##### `import` (default: `true`)

Allows you to inline local `@import` files (thanks to [postcss-import](https://github.com/postcss/postcss-import#readme)):

* you can refer to `node_modules` and `web_modules` packages
* you can omit .css extension

_Note: you can pass [postcss-import options](https://github.com/postcss/postcss-import#readme) directly._

##### `url` (default: `true`)

By default, `url()` are rebased according to `from` (and `to`) option(s). This is convenient especially for `@import`ed files.

_Note: you can pass [postcss-url options](https://github.com/postcss/postcss-url#options) directly in order to inline or have more control over urls._

##### `compress` (default: `false`)

Allows you to compress the output (using [cssnano](https://github.com/ben-eb/cssnano)).
You can enable minification by passing `true` or by providing an object containing [cssnano options](https://github.com/ben-eb/cssnano#options).

##### `sourcemap` (default: `false`)

This option is a shortcut to enable inlined sourcemap in the output.  
Just pass `true` to get the sourcemap at the end of the output.  

- _If you want an accurate sourcemap, please also use the `from` option._  
- _If you want more control on the sourcemap, please use the `map` option instead._

##### `map` (default: _depends on `sourcemap`_)

_(default: `undefined` if `sourcemap` is `false`, `inline` if `sourcemap` it true)_

If you want better control on sourcemap, you are at the right place.
This is the [postcss `map` option](https://github.com/postcss/postcss#source-map-1), so checkout the related documentation directly.

_If you specify this option, `sourcemap` value will be ignored._

**`/!\` Using this option might change the return value of `cssnext()` (`object` instead of css `string` if map is not inlined. The object will be like {css: "{css string}", map: {sourcemap object}})**

##### `from` (default: `null`)

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

### Usage with other tools

Here are some tools that will help you use cssnext in your current workflow:

* [gulp-cssnext](https://github.com/cssnext/gulp-cssnext)
* [grunt-cssnext](https://github.com/cssnext/grunt-cssnext)
* [cssnext-loader (webpack)](https://github.com/cssnext/cssnext-loader)
* [duo-cssnext](https://github.com/cssnext/duo-cssnext)
* [cssnext-brunch](https://github.com/cssnext/cssnext-brunch)
* [broccoli-cssnext](https://github.com/cssnext/broccoli-cssnext)
* [Prepros 5](https://prepros.io/) (_More options_ (dropdown) > _Project options_ (item) > _Compilers_ (tab) > _Enable cssnext_ (checkbox at the bottom))
* @todo component-builder package
* @todo meteor package

_Note that you can also use cssnext as a PostCSS plugin._

---

## Contributing

_cssnext uses a lot of [postcss](https://github.com/postcss) plugins, so you might need to take a look at them if you find an issue or want to create or enhance a feature._

Otherwise, work on a branch, install dev-dependencies, respect coding style & run tests before submitting a bug fix or a feature.

```console
$ git clone https://github.com/cssnext/cssnext.git
$ git checkout -b patch-1
$ npm install
$ npm test
```

### Add a feature

1. Add test files (input + expected output) in [`test/fixtures/features`](test/features)
- If the feature can affect some others, update [`test/fixtures/cases/example.css`](test/cases/example.css) to test integration with other features
- Run test, & check tests are broken (otherwise feature is useless)
- Choose a pretty simple and clear name (that match the specs)
- Add the feature in the [README features list](#features) (title, link to spec, link of the plugin, short desc)
- Add the feature in the [README node.js options list](#features-default-all-features) (camelCaseName)
- Add the dependency in the [`package.json`](package.json)
- Add the feature in the source (in [`index.js`](index.js)), in the appropriate place (order matter)
- Run test and be happy
- Add feature on [the playground](https://github.com/cssnext/cssnext-playground) example
- Add feature on [the website](https://github.com/cssnext/cssnext.github.io)

## [Changelog](CHANGELOG.md)

## [License](LICENSE)

---

## People

The current lead maintainer is [Maxime Thirouin](http://moox.io/). [![MoOx' Gratipay](https://img.shields.io/gratipay/MoOx.svg)](https://gratipay.com/MoOx/)

See [all contributors](https://github.com/cssnext/cssnext/graphs/contributors).

## Acknowledgements

Huge thanks to all the people that where involved in:

- [rework](https://github.com/reworkcss/rework/graphs/contributors)
- [rework css parser](https://github.com/reworkcss/css/graphs/contributors)
- [myth](https://github.com/segmentio/myth/graphs/contributors)
- [autoprefixer](https://github.com/postcss/autoprefixer/graphs/contributors)
- [postcss](https://github.com/postcss/postcss/graphs/contributors)

Without all those people, this project would not exist.
