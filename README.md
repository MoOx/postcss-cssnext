# ![cssnext](logo/cssnext-256.png)

[![Build Status](http://img.shields.io/travis/putaindecode/cssnext.svg)](https://travis-ci.org/putaindecode/cssnext)
[![Code Climate](http://img.shields.io/codeclimate/github/putaindecode/cssnext.svg)](https://codeclimate.com/github/putaindecode/cssnext)
[![NPM version](http://img.shields.io/npm/v/cssnext.svg)](https://www.npmjs.org/package/cssnext)

> Use tomorrow's CSS syntax, today.

_This is not a CSS preprocessor, but can replace one._  
This is a CSS transpiler (CSS4+ to CSS3) that allow you to use tomorrow's CSS syntax today. It transforms CSS specs  that are not already implemented in popular browsers into more compatible CSS.  
Take a look to [available features](#available).

**cssnext** is similar to [Myth](http://myth.io/) or [SUIT CSS preprocessor](https://github.com/suitcss/preprocessor) but push the concept to the next level by supporting more features.

**cssnext** works great with [SUIT CSS](http://suitcss.github.io/) and [cssrecipes](https://github.com/cssrecipes).

**tl;dr** : [try cssnext in your browser](http://putaindecode.github.io/cssnext-playground).

_Follow [@cssnext](https://twitter.com/cssnext) to get latest news & [join #cssnext on irc.freenode.net](irc://irc.freenode.net/cssnext) if you have any questions._

## Goals

* Allow using future CSS syntax today.
* Keep code close as possible to the original code.

## Non-Goals

* Provide polyfills for future CSS APIs that depend on the client browser.

## Features

### Available

* automatic vendor prefixes (via [autoprefixer](https://github.com/postcss/autoprefixer))
* [custom properties & `var()`](http://www.w3.org/TR/css-variables/) (via [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties))
* [reduced `calc()`](https://github.com/MoOx/reduce-css-calc#readme) (via [postcss-calc](https://github.com/postcss/postcss-calc), to optimize previously parsed `var()` references)
* [custom media queries](http://dev.w3.org/csswg/mediaqueries/#custom-mq) (via [postcss-custom-media](https://github.com/postcss/postcss-custom-media)), a nice way to avoid repeating media queries
* [`color()`](http://dev.w3.org/csswg/css-color/#modifying-colors) (via [postcss-color](https://github.com/postcss/postcss-color)), a color function to modify color
* [`hwb()`](http://dev.w3.org/csswg/css-color/#the-hwb-notation) (via [postcss-color](https://github.com/postcss/postcss-color)), similar to `hsl()` but easier for humans to work with
* [#rrggbbaa](http://dev.w3.org/csswg/css-color/#hex-notation) (via [postcss-color](https://github.com/postcss/postcss-color))


### Additionals enhancements

* `@import` inline local files  (via [postcss-import](https://github.com/postcss/postcss-import)) to output an bundled CSS file.


### @todo

Any omissions of the CSS specifications (even in draft) that are subject to be handled by cssnext are not intentional.  
Feel free to [open a new issue](issues) if you find something that should be handled.  
Keep in mind that, as of right now, this project is intended to support new CSS *syntax* only.

---

## Installation

    $ npm install cssnext

You can install it

- globally (`-g`), to use it through the [CLI](cli)
- locally ()`--save` or `--save-dev`), to use it through [npm scripts](https://www.npmjs.org/doc/misc/npm-scripts.html) (`npm run`) or via `.node_modules/.bin/csnext`
- by using [other tools](usage-with-other-tools) like [gulp-cssnext](https://github.com/putaindecode/gulp-cssnext)

## Usage

You can use cssnext using [CLI](cli), as [a JavaScript library](node-js-library) or through [others tools](usage-with-other-tools).

### CLI

cssnext offer a command-line interface. Here's how to compile a file and print it to stdout:

    $ cssnext index.css

To create an output file, you can just add a second argument

    $ cssnext index.css output.css

Or use CLI std(in|out) redirection(s)

    $ cat input.css | cssnext > output.css

### CLI options

If you don't care about a certain feature, such as custom media queries, you can omit support for them like so:

    $ cssnext --no-custom-media index.css

To enable source maps for these files, add the `--sourcemap` flag.

**To see all CLI options**

    $ cssnext --help

### Node.js API

```js
var cssnext = require("cssnext")
var fs = require("fs")

var input = fs.readFileSync("index.css", "utf8")

var output = cssnext(input)
fs.writeFileSync("dist/index.css", output)
```

cssnext accept 2 arguments: a css string and an object of options.

#### Node.js options

_For now, all options are passed to all postcss plugins._ This mean you should be able to any specific plugin options.

##### `features` (default: all features)

Object containing key of features to enable/disable.  
_No key means feature is enabled_.

```js
//eg: disable color support
var output = cssnext({
  features: {
    color: false
  }
})
```

Here is all available features:

- `import`
- `customProperties`
- `calc`
- `customMedia`
- `color`
- `prefixes`

##### `browsers` (default: autoprefixer default)

Array to specify browsers you want to target (for now only used by [autoprefixer](https://github.com/postcss/autoprefixer)).  
See [autoprefixer documentation of this option for more details](https://github.com/postcss/autoprefixer#browsers).

Default to something like `["> 1%", "last 2 versions", "Firefox ESR"]`.

##### `compress` (default: `false`)

Allow you to compress the output (using [CSSWring](https://github.com/hail2u/node-csswring)).

##### `sourcemap` (default: `false`)

**If you want a accurate sourcemap, please use instead the `from` option.**

This option is a shortcut to enable inlined sourcemap in the output.  
Just pass `true` to get the sourcemap at the end of the output.  
If you want better control on sourcemap, use [postcss `map` option](https://github.com/postcss/postcss#source-map-1) directly.

##### `from` (default: `null`)

Source of the file. Needed for sourcemap.

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

##### `path` (default: `dirname(from)` || `process.cwd()`)

A string or an array of paths in where to look for files when inlining using `@import`.  
Default to dirname of postcss [`from`](https://github.com/postcss/postcss#node-source) or fallback to `process.cwd()`.

_Note: nested `@import` will additionally benefit of the relative dirname of imported files._


### Usage with other tools

Here are some tools that will help you use cssnext in your current workflow

* [gulp-cssnext](https://github.com/putaindecode/gulp-cssnext)
* [grunt-cssnext](https://github.com/putaindecode/grunt-cssnext)
* @todo brunch plugin
* @todo brocolli plugin
* @todo component-builder package
* @todo meteor package

---

## Contributing

_cssnext uses a lot of [postcss](https://github.com/postcss) plugins, so you might need to take a look at them if you found an issue or want to create or enhance a feature._

Otherwise, work on a branch, install dev-dependencies, respect coding style & run tests before submitting a bug fix or a feature.

    $ git clone https://github.com/putaindecode/cssnext.git
    $ git checkout -b patch-1
    $ npm install
    $ npm test

## [Changelog](CHANGELOG.md)

## [License](LICENSE-MIT)

---

## Acknowledgements

Huge thanks to all the people that where involved in :
- [rework](https://github.com/reworkcss/rework/graphs/contributors)
- [rework css parser](https://github.com/reworkcss/css/graphs/contributors)
- [myth](https://github.com/segmentio/myth/graphs/contributors)
- [autoprefixer](https://github.com/postcss/autoprefixer/graphs/contributors)

Thanks to [Andrey Sitnik](https://github.com/ai) for [postcss](https://github.com/postcss/postcss).  

Without all those people, this project would not exist.
