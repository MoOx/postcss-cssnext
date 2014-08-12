# ![cssnext](logo/cssnext-256.png)
<a href="https://travis-ci.org/putaindecode/cssnext"><img align="right" alt="Build Status" src="https://travis-ci.org/putaindecode/cssnext.png?branch=master" /></a>

Use tomorrow's CSS syntax today.

_This is not a CSS preprocessor, but can totally replace one._  
This is a CSS transpiler for CSS specs that are not already implemented in popular browsers. Take a look to [available features](available).

@todo ~~**tl;dr** : [try cssnext in your browser](http://cssnext.putaindecode.io/).~~

## Goals

* Allow using future CSS syntax today.
* Keep code close as possible to the original code.

## Non-Goals

* Provide polyfills for future CSS APIs that depend on the client browser.

## Features

### Available

Right now, nothing :D

### @todo

* automatic vendor prefixes (via [autoprefixer](https://github.com/ai/autoprefixer))
* [custom properties & `var()`](http://www.w3.org/TR/css-variables/) (via [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties))
* [reduced `calc()`]() (via [postcss-calc](https://github.com/postcss/postcss-calc), to optimize previously parsed `var()` references)
* [custom media queries](http://dev.w3.org/csswg/mediaqueries/#custom-mq) (via [postcss-custom-media](https://github.com/postcss/postcss-custom-media)), a nice way to avoid repeating media queries
* [`color()`](http://dev.w3.org/csswg/css-color/#modifying-colors) (via [postcss-color](https://github.com/postcss/postcss-color)), a color function to modify color
* [`hwb()`](http://dev.w3.org/csswg/css-color/#the-hwb-notation) (via [postcss-color](https://github.com/postcss/postcss-color)), similar to `hsl()` but easier for humans to work with
* [#rrggbbaa](http://dev.w3.org/csswg/css-color/#hex-notation) (via [postcss-color](https://github.com/postcss/postcss-color))

_Another feature ~~is~~ __will be__ available in cssnext: local `@import` files can be inlined  (via [postcss-import](https://github.com/postcss/postcss-import)) to output an optimized an ready to use CSS file._

Any omissions of the CSS specifications (even in draft) that are subject to be handled bye cssnext are not intentional.  
Feel free to [open a new issue]() if you find something that should be handled.  
Keep in mind that, as of right now, this project is intended to support new CSS *syntax* only.

## Installation

    $ npm install [-g|--save-dev] cssnext

You can install it

- globally, to use it through the [CLI](cli)
- locally, to use it through [npm scripts](https://www.npmjs.org/doc/misc/npm-scripts.html) (`npm run`) or via `.node_modules/.bin/csnext`
- by using [other tools](usage-with-other-tools) like [gulp-cssnext](https://github.com/putaindecode/gulp-cssnext)

## Usage

You can use cssnext using [CLI](cli), as [a JavaScript library](node-js-library) or through [others tools](usage-with-other-tools).

### @todo CLI

cssnext offer a command-line interface. Here's how to compile a file and print it to stdout:

    $ cssnext index.css

To create an output file, you can just add a second argument

    $ cssnext index.css output.css

Or use CLI stdout redirection `$ cssnext index.css > output.css`

### CLI options

If you don't care about a certain feature, such as custom media queries, you can omit support for them like so:

    $ cssnext --no-custom-media index.css

To enable source maps for these files, add the `--sourcemaps` flag.

**To see all CLI options**

    $ cssnext --help

### @todo Node.js library

```js
var cssnext = require("cssnext")
var fs = require("fs")

var input = fs.readFileSync("index.css", "utf8")

var output = cssnext(css)
fs.writeFileSync("dist/index.css", output)
```

cssnext accept 2 arguments: a css string and an object of options.

#### Node.js options

@todo

### Usage with other tools

Here are some tools that will help you to use cssnext in your current workflow

* @todo [gulp-cssnext](https://github.com/putaindecode/gulp-cssnext)
* @todo [grunt-cssnext](https://github.com/putaindecode/grunt-cssnext)
* @todo brunch plugin
* @todo brocolli plugin
* @todo component-builder package
* @todo meteor package

---

## Contributing

_cssnext use a lot of [postcss](https://github.com/postcss) plugins, so you might take a look to them if you found an issue or want to create or enhance a feature._

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
- [autoprefixer](https://github.com/ai/autoprefixer/graphs/contributors)

Thanks to [Andrey Sitnik](https://github.com/ai) for [postcss](https://github.com/postcss/postcss).  

Without all those people, this project would not exist.
