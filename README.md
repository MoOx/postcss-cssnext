# postcss-cssnext

[![NPM version](http://img.shields.io/npm/v/postcss-cssnext.svg?style=flat)](https://www.npmjs.org/package/postcss-cssnext)
[![Travis Build Status](https://img.shields.io/travis/cssnext/postcss-cssnext.svg?label=unix%20build)](https://travis-ci.org/cssnext/postcss-cssnext)
[![AppVeyor Build Status](https://img.shields.io/appveyor/ci/MoOx/postcss-cssnext.svg?label=windows%20build)](https://ci.appveyor.com/project/MoOx/postcss-cssnext)
[![Join the chat at https://gitter.im/cssnext/cssnext](https://img.shields.io/badge/gitter%20-join%20chat%20%E2%9E%9E-1dce73.svg)](https://gitter.im/cssnext/cssnext)


> Use tomorrow's CSS syntax, today.

cssnext is a CSS transpiler that allows you to use the latest CSS syntax today.
It transforms CSS specs into more compatible CSS so you don’t need to wait for browser support.

---

# This repository contains the PostCSS plugin.

## Why **postcss-cssnext** ? What is the difference with **cssnext** ?

### Short answer

If you're using PostCSS in your build process, and want to add cssnext, you need only `postcss-cssnext`
(check the "options" section here below).
Otherwise, if you like cssnext to work as a full standalone package with its own cli
(independently of PostCSS), use `cssnext`.

### More details

cssnext was at first designed to be a complete tool, before PostCSS became
popular; thus, includes some options that don't really belong in a PostCSS
plugin (e.g., `import`, `url`, `compress`, `plugins`).
These days, most people use PostCSS directly so we decided to make integration of
cssnext more simple by providing a simple (real) plugin.

### Options

If you were using cssnext with some options here is what you need to know:

- `import`: just add into your plugins list
  [`postcss-import`](https://github.com/postcss/postcss-import)
- `url`: just add into your plugins list
  [`postcss-url`](https://github.com/postcss/postcss-url)
- `compress`: just add into your plugins list
  [`cssnano`](https://github.com/ben-eb/cssnano)
- `plugins`: just add the plugins directly in your list
- `messages`: see
  [`postcss-reporter`](https://github.com/postcss/postcss-reporter)
  and
  [`postcss-browser-reporter`](https://github.com/postcss/postcss-browser-reporter)
- `sourcemap`, `map`, `to`, `from`: see
  [PostCSS source map documentation](https://github.com/postcss/postcss#source-map)


## But I like cssnext as it was !

_Don't worry. That's why we created another package._
The **cssnext** package will have a major release soon in order to introduce a
minor but breaking changes in the Node.js API, but you will get the same tool as
before.
The nice thing is: **cssnext** will use **postcss-cssnext** under the hood.

---

## Check out [cssnext website](http://cssnext.io/)

- [Features](http://cssnext.io/features/)
- [Setup](http://cssnext.io/setup/)
- [Usage](http://cssnext.io/usage/)
- [Playground](http://cssnext.io/playground/)

For questions and support please visit the
[gitter room](https://gitter.im/cssnext/cssnext).

---

_The [issue tracker](https://github.com/cssnext/cssnext/issues) is exclusively for bug reports and feature requests._

---

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
