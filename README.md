# [![cssnext](https://raw.githubusercontent.com/cssnext/cssnext.github.io/source/logo/cssnext-256.png)](https://cssnext.github.io)

[![Build Status](http://img.shields.io/travis/cssnext/cssnext.svg)](https://travis-ci.org/cssnext/cssnext)
[![Code Climate](http://img.shields.io/codeclimate/github/cssnext/cssnext.svg)](https://codeclimate.com/github/cssnext/cssnext)
[![NPM version](http://img.shields.io/npm/v/cssnext.svg)](https://www.npmjs.org/package/cssnext)

> Use tomorrow's CSS syntax, today.

_This is not a classic CSS preprocessor, but can replace one._  
This is a CSS transpiler (CSS4+ to CSS3) that allows you to use tomorrow's CSS syntax today. It transforms CSS specs that are not already implemented in popular browsers into more compatible CSS.  
Take a look at [available features](#features).

**cssnext** is similar to [Myth](http://myth.io/) or [SUIT CSS preprocessor](https://github.com/suitcss/preprocessor) but pushes the concept to the next level by supporting more features.

**cssnext** works great with [cssrecipes](https://cssrecipes.github.io/) or [SUIT CSS](https://suitcss.github.io/).

**tl;dr** : [try cssnext in your browser](https://cssnext.github.io/cssnext-playground).

_Follow [@cssnext](https://twitter.com/cssnext) to get latest news & [join #cssnext on irc.freenode.net](irc://irc.freenode.net/cssnext) if you have any questions._

## Goals

* Allow using future CSS syntax today.
* Keep code as close as possible to the original code.

## Non-Goals

* Provide polyfills for future CSS APIs that depend on the client browser.

## Features

* automatic vendor prefixes ([⇗](https://github.com/postcss/autoprefixer)),
* [custom properties & `var()`](http://www.w3.org/TR/css-variables/)
([⇗](https://github.com/postcss/postcss-custom-properties)) limited to `:root`,
* [reduced `calc()`](https://github.com/MoOx/reduce-css-calc#readme)
([⇗](https://github.com/postcss/postcss-calc)) to optimize previously parsed `var()` references),
* [custom media queries](http://dev.w3.org/csswg/mediaqueries/#custom-mq)
([⇗](https://github.com/postcss/postcss-custom-media)) a nice way to have semantic media queries,
* [media queries ranges](http://dev.w3.org/csswg/mediaqueries/#mq-ranges)
([⇗](https://github.com/postcss/postcss-media-minmax)) that allows to replace min-/max- with `<=` & `>=` (syntax easier to read),
* [custom selectors](http://dev.w3.org/csswg/css-extensions/#custom-selectors)
([⇗](https://github.com/postcss/postcss-custom-selector)) to create your own selectors,
* [`color()`](http://dev.w3.org/csswg/css-color/#modifying-colors)
([⇗](https://github.com/postcss/postcss-color-function)) a color function to modify colors,
* [`hwb()`](http://dev.w3.org/csswg/css-color/#the-hwb-notation)
([⇗](https://github.com/postcss/postcss-color-hwb)) similar to `hsl()` but easier for humans to work with,
* [`gray()`](http://dev.w3.org/csswg/css-color/#grays)
([⇗](https://github.com/postcss/postcss-color-gray)),
* [#rrggbbaa](http://dev.w3.org/csswg/css-color/#hex-notation)
([⇗](https://github.com/postcss/postcss-color-hex-alpha)),
* [`rebeccapurple`](http://dev.w3.org/csswg/css-color/#valdef-color-rebeccapurple)
([⇗](https://github.com/postcss/postcss-color-rebeccapurple)),
* [font-variant](http://dev.w3.org/csswg/css-fonts/#propdef-font-variant) properties
([⇗](https://github.com/postcss/postcss-font-variant)),
* [filter](http://www.w3.org/TR/filter-effects/) properties
([⇗](https://github.com/iamvdo/pleeease-filters))


### Bonus (according to primary goals)

* `@import` inline local files and modules - `node_modules` or `web_modules` ([⇗](https://github.com/postcss/postcss-import)) to output a bundled CSS file.
* minification is available ([⇗](https://github.com/hail2u/node-csswring)) if you want to compress the output for production.


### @todo

Any omissions of the CSS specifications (even in draft) that are subject to be handled by cssnext are not intentional.  
You can take a look to the [list of features that are waiting to be implemented](https://github.com/cssnext/cssnext/issues?q=is%3Aopen+is%3Aissue+label%3Afeature+label%3Aready).  
Feel free to work on a feature ready to be added, or [open a new issue](https://github.com/cssnext/cssnext/issues/new) if you find something that should be handled.  
Keep in mind that, as of right now, this project is intended to support new CSS *syntax* only.

---

## Limitations

### Custom properties

The current transformation for custom properties just aims to provide a future-proof way of using a **limited subset (to top-level `:root` selector)** of the features provided by native CSS custom properties.  
The transformation is not complete and can't be properly. By injecting selectors with new computed rules, we will break original cascade & unexpected results might happen.

---

## Installation

    $ npm install cssnext

You can install it

- globally (`-g`), to use it through the [CLI](cli)
- locally (`--save` or `--save-dev`), to use it through [npm scripts](https://www.npmjs.org/doc/misc/npm-scripts.html) (`npm run`) or via `.node_modules/.bin/csnext`
- by using [other plugins & tools](usage-with-other-tools) like [gulp-cssnext](https://github.com/cssnext/gulp-cssnext)

## Usage

You can use cssnext using [CLI](cli), as [a JavaScript library](node-js-library) or through [others tools](usage-with-other-tools).

### CLI

cssnext offers a command-line interface. Here's how to compile a file and print it to stdout:

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

cssnext can be used with it's own API

#### `var string = cssnext(string, options)`

cssnext accepts 2 arguments: a css string and an object of options.

```js
var fs = require("fs")
var cssnext = require("cssnext")

var input = fs.readFileSync("index.css", "utf8")

var output = cssnext(input)
fs.writeFileSync("dist/index.css", output)
```

**`/!\` Note: if you are using non inlined sourcemaps, cssnext will return a object: `{css: string, map: sourcemap}`**

See [sourcemap](#sourcemap-default-false) & [map](#map-default-depends-on-sourcemap) options for more informations.

#### `var postcssPlugin = cssnext(options)`

cssnext can be used as a postcss plugin

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

##### `features` (default: all features)

Object containing key of features to enable/disable.  
_Features are enabled by default: no key means feature is enabled_.

```js
//eg: disable import support
var output = cssnext(input, {
  features: {
    import: false
  }
})
```

Each features are based on PostCSS plugins & can get their own options.
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

To know all available options, please check [available features](#available) list where you will find references to all the plugins used.

Here are all available features:

- `import`
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
- `autoprefixer`

_Note: order is important to get everything working correctly._

##### `compress` (default: `false`)

Allows you to compress the output (using [CSSWring](https://github.com/hail2u/node-csswring)).

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

**`/!\` Using this option might changes the return value of `cssnext()` (`object` instead of css `string` if map is not inlined. The object will be like {css: "{css string}", map: {sourcemap object}})**

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

##### Some feature options

###### `features.autoprefixer.browsers` (default: _autoprefixer default_)

Array to specify browsers you want to target (for now only used by [autoprefixer](https://github.com/postcss/autoprefixer)).  
See [autoprefixer documentation of this option for more details](https://github.com/postcss/autoprefixer#browsers).

Defaults to something like `["> 1%", "last 2 versions", "Firefox ESR"]`.

```js
//eg
var output = cssnext(input, {
  features: {
    autoprefixer: {
      browsers: ["> 1%", "last 2 versions", "Firefox ESR"]
    }
  }
})
```

###### `features.import.path` (default: `dirname(from)` || `process.cwd()`)

A string or an array of paths in which to look for files when inlining using `@import`.  
Defaults to dirname of postcss [`from`](https://github.com/postcss/postcss#node-source) option, or fallback to `process.cwd()`.

_Note: nested `@import` will additionally benefit of the relative dirname of imported files._

```js
//eg
var output = cssnext(input, {
  features: {
    import: {
      path: ["src/stylesheets"]
    }
  }
})
```


### Usage with other tools

Here are some tools that will help you use cssnext in your current workflow

* [gulp-cssnext](https://github.com/cssnext/gulp-cssnext)
* [grunt-cssnext](https://github.com/cssnext/grunt-cssnext)
* [cssnext-loader (webpack )](https://github.com/cssnext/cssnext-loader)
* [duo-cssnext](https://github.com/cssnext/duo-cssnext)
* [cssnext-brunch](https://github.com/cssnext/cssnext-brunch)
* [broccoli-cssnext](https://github.com/cssnext/broccoli-cssnext)
* [Prepros 5](https://prepros.io/) (_More options_ (dropdown) > _Project options_ (item) > _Compilers_ (tab) > _Enable cssnext_ (checkbox at the bottom))
* @todo component-builder package
* @todo meteor package

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

1. Add test files (input + expected output) in [`test/features`](test/features),
1. If the feature can affect some others, update [`test/cases.example.css`](test/cases.example.css) to test integration with other features,
2. Run test, & check tests are broken (otherwise feature is useless),
3. Choose a pretty simple and clear name (that match the specs),
4. Add the feature in the [README features list](#features) (title, link to spec, link of the plugin, short desc),
4. Add the feature in the [README node.js options list](#features-default-all-features) (camelCaseName),
5. Add the dependency in the [`package.json`](package.json),
6. Add the feature in the source (in [`index.js`](index.js)), in the appropriate place (order matter),
7. Run test, should be good now :)

## [Changelog](CHANGELOG.md)

## [License](LICENSE)

---

## Acknowledgements

Huge thanks to all the people that where involved in :

- [rework](https://github.com/reworkcss/rework/graphs/contributors)
- [rework css parser](https://github.com/reworkcss/css/graphs/contributors)
- [myth](https://github.com/segmentio/myth/graphs/contributors)
- [autoprefixer](https://github.com/postcss/autoprefixer/graphs/contributors)
- [postcss](https://github.com/postcss/postcss/graphs/contributors)

Without all those people, this project would not exist.
