---
title: Install & setup cssnext
backgroundModifier: darkTeam
incomplete: true
---

## Installation

cssnext is available on
[github](https://github.com/cssnext/cssnext)
and [npm](https://www.npmjs.org/package/cssnext).

You can install it:

- locally (`--save` or `--save-dev`), to use it through [npm scripts](https://www.npmjs.org/doc/misc/npm-scripts.html) (`npm run`) or via `.node_modules/.bin/cssnext`
- globally (`-g`), to use it through the [CLI](cli) _(not recommended)_
- by using [other plugins & tools](#usage) like [gulp-cssnext](https://github.com/cssnext/gulp-cssnext)

The main package offers
[a CLI](https://github.com/cssnext/cssnext#cli) and
[a Node.js/io.js API](https://github.com/cssnext/cssnext#nodejs-api").

<p class="cssnext-Center">
```
$ npm install cssnext
```
</p>

## Usage

You can use cssnext using [CLI](#cli),
as [a JavaScript library](#nodejs-api),
as a [PostCSS](https://github.com/postcss/postcss) plugin
or through others tools below:

<p class="cssnext-Tools">
[webpack](https://github.com/cssnext/cssnext-loader)
,
[gulp](https://github.com/cssnext/gulp-cssnext)
,
[grunt](https://github.com/cssnext/grunt-cssnext)
,
[brunch](https://github.com/cssnext/cssnext-brunch)
,
[broccoli](https://github.com/cssnext/broccoli-cssnext)
,
[connect](https://github.com/cssnext/cssnext-connect)
,
[duo](https://github.com/cssnext/duo-cssnext)
or in
[prepros 5](https://prepros.io/)
</p>


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
