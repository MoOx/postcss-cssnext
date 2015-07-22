---
title: Install & setup cssnext
subtitle: How to use cssnext in your workflow
backgroundModifier: darkTeam
incomplete: true
---


@[toc]


## Installation

cssnext is available on
[github](https://github.com/cssnext/cssnext)
and [npm](https://www.npmjs.org/package/cssnext).

```console
$ npm install cssnext
```

You can install it:

- locally (`--save` or `--save-dev`), to use it through [npm scripts](https://www.npmjs.org/doc/misc/npm-scripts.html) (`npm run`) or via `.node_modules/.bin/cssnext`
- globally (`-g`), to use it through the [CLI](cli) _(not recommended)_
- by using [other plugins & tools](#usage) like
[gulp-cssnext](https://github.com/cssnext/gulp-cssnext)
or
[cssnext-loader](https://github.com/cssnext/cssnext-loader)

The main package offers
[a CLI](https://github.com/cssnext/cssnext#cli) and
[a Node.js/io.js API](https://github.com/cssnext/cssnext#nodejs-api").

### Install from git

In order to install cssnext from the git repository (eg: if you want to try
the _master_ branch of the git repository),
you will need to build the package after the installation from git repository.
You can easily do this:

```console
$ npm i -D cssnext/cssnext && cd node_modules/cssnext && npm i && cd ../..
```

## Usage

You can use cssnext using [CLI](#cli),
as [a JavaScript library](#nodejs-api),
as a [PostCSS](https://github.com/postcss/postcss) plugin
or through others tools below:

<p class="cssnext-Tools">
  <a href="https://github.com/cssnext/cssnext-loader">webpack</a>,
  <a href="https://github.com/cssnext/cssnextify">browserify</a>,
  <a href="https://github.com/cssnext/gulp-cssnext">gulp</a>,
  <a href="https://github.com/cssnext/grunt-cssnext">grunt</a>,
  <a href="https://github.com/cssnext/cssnext-brunch">brunch</a>,
  <a href="https://github.com/cssnext/broccoli-cssnext">broccoli</a>,
  <a href="https://github.com/cssnext/fly-cssnext">fly</a>,
  <a href="https://github.com/cssnext/cssnext-connect">connect</a>,
  <a href="https://github.com/cssnext/duo-cssnext">duo</a>
  or in
  <a href="https://prepros.io/">Prepros</a>
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

#### CLI options

If you don't care about a certain feature, such as custom media queries, you can omit support for them like so:

```console
$ cssnext --no-custom-media index.css
```

To enable source maps for these files, add the `--sourcemap` flag.

_To see all CLI options_

```console
$ cssnext --help
```

### Node.js API

cssnext can be used with its own API or as a PostCSS plugin.

#### As a JavaScript library

`var string = cssnext(string, options)`

cssnext accepts 2 arguments: a css string and an object of options.

```js
var fs = require("fs")
var cssnext = require("cssnext")

var input = fs.readFileSync("index.css", "utf8")

var output = cssnext(input)
fs.writeFileSync("dist/index.css", output)
```

**`/!\` Note: if you are using non inlined sourcemaps, cssnext will return an object: `{css: string, map: sourcemap}`**

See
[sourcemap](/usage/#sourcemap) &
[map](/usage/#map)
options for more informations.

#### As a PostCSS plugin

`var postcssPlugin = cssnext(options)`

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
