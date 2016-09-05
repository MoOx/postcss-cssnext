# 2.8.0 - 2016-09-05

-  Added: attribute case insensitive support
  (eg: ``[data-thing=stuff i] {`` to be able to select all ``data-thing``
  attribute, without having to thing about the case of the value)
  ([#306](https://github.com/MoOx/postcss-cssnext/pull/306) - @Semigradsky)

# 2.7.0 - 2016-06-28

- Added: ``＠apply`` support (definitions limited to ``:root`` selector)
  ([#291](https://github.com/MoOx/postcss-cssnext/issues/291)) - @pascalduez)

# 2.6.0 - 2016-06-01

- Added: ``overflow-wrap`` fallback
  ([#280](https://github.com/MoOx/postcss-cssnext/pull/280) - @MattDiMu)

# 2.5.2 - 2016-04-04

- Fixed: pleeease-filters has been udpated to v3, in order to provide a real
  PostCSS plugin
  ([#274](https://github.com/MoOx/postcss-cssnext/pull/274))

# 2.5.1 - 2016-03-14

> Oops!

- Fixed: ``"chalk" is undefined``.
  ([#266](https://github.com/MoOx/postcss-cssnext/pull/266))
- Fixed: typo in related warning.

# 2.5.0 - 2016-03-14

- Added: cssnext will now warn you when you have duplicates plugins.
  This is a really common mistake, people include plugins that are already
  included in cssnext and maybe sometimes in an inaccurate position.  
  **Most tutorial on the internet are wrong (probably 99%)
  and show provide duplicates in their examples.
  (eg: autoprefixer + cssnext - but cssnext already includes autoprefixer).**  
  _In order to fix this, here is a warning. You are welcome._
  [Read more about this issue](https://github.com/postcss/postcss/issues/764)
- Added: ``rem`` will now adjust its behavior according to browser option
  (IE 9 and IE 10 will only have ``px`` in some places, where rem support is
  buggy, per caniuse notes)
  ([#264](https://github.com/MoOx/postcss-cssnext/issues/264))

# 2.4.0 - 2016-01-08

- Added: documentation is now included in the npm package in
  `postcss-cssnext/docs/content`

# 2.3.0 - 2015-12-16

- Added: we use latest version of pixrem(@^3)
([6d44410](https://github.com/MoOx/postcss-cssnext/commit/6d4441023f30895211f010776b142d02359f4d0a))
So now `rem` have
[2 new parameters](https://github.com/robwierzbowski/node-pixrem#options):
  - ``rootValue`` to define the root element font-size manually
  - ``unitPrecision`` for rounded values

# 2.2.0 - 2015-10-21

- Added: [postcss-nesting](https://github.com/jonathantneal/postcss-nesting)
([b31f167](https://github.com/MoOx/postcss-cssnext/commit/b31f167d7659a18a14fce65a7a94da07560e6a59)).
Supports nesting via the `@nest` syntax. See postcss-nesting documentation.

# 2.1.0 - 2015-09-16

- Added: [postcss-initial](https://github.com/maximkoretskiy/postcss-initial)
([a907881](https://github.com/MoOx/postcss-cssnext/commit/a90788153801a3f898f6cc1ade189d4de2af3367)).
Supports `initial` value for  all properties. Also it supports `all: initial`.
_Does not support `all: unset` and `all: inherit`._
Plugin can be useful for creating isolated components.
  - `all` specification: https://drafts.csswg.org/css-cascade/#all-shorthand
  - `all` browsers support: http://caniuse.com/#feat=css-all
  - `initial` value specification: https://drafts.csswg.org/css-cascade/#initial-value
  - `initial` value browser support: http://caniuse.com/#feat=css-initial-value

# 2.0.1 - 2015-09-14

- Fixed: plugin can be consumed correctly from es5 environment
([7d6d3c0](https://github.com/MoOx/postcss-cssnext/commit/7d6d3c018d8ca17091d4cfe3d5d61e246ad8775d)).

# 2.0.0 - 2015-09-14

- Added: support for PostCSS v5.x
- Removed: support for PostCSS v4.x
([b5ece99...8907c13](https://github.com/MoOx/postcss-cssnext/compare/b5ece99c1e1b5e4cdfd6c25f856946bbcbc2247c...8907c13d31662a2cb393edb0387144dfbba81659)).

---

**pre 2.0.0 information was related to `cssnext` package.**

---

# 1.8.4 - 2015-08-24

- Fixed: `compress` option now works again correctly. A recent update in cssnano
has introduced some minor breaking changes the way cssnext changed plugins
metadata (`pluginName`).
A direct minor change is that `messages` (in console or in css output) now show
real origin (postcss plugin name) instead of a vague "cssnext" origin.
([#195](https://github.com/MoOx/postcss-cssnext/issues/195))

# 1.8.3 - 2015-08-06

- Fixed: `url` option (postcss-url) have been updated in order to benefit from
severals fixes.

# 1.8.2 - 2015-07-23

- Fixed: CLI watcher now works watchs correctl multiples `@import`
([#123](https://github.com/MoOx/postcss-cssnext/issues/123))

# 1.8.1 - 2015-07-15

- Added: cssnext now throw an error if used as a webpack loader to prevent
unexpected usage with a recommendation for
[cssnext-loader](https://github.com/MoOx/postcss-cssnext-loader)
([#61](https://github.com/MoOx/postcss-cssnext/issues/61))

# 1.8.0 - 2015-06-29

- Fixed: replacement of `postcss-log-warnings` (deprecated) by
`postcss-reporter`
([#162](https://github.com/MoOx/postcss-cssnext/issues/162))
- Fixed: CLI now add `to` option automatically
([#159](https://github.com/MoOx/postcss-cssnext/issues/159))
If you were happy with the previous CLI behavior (which was not rebasing url),
you should probably just add the `--no-url` to keep the CSS as it was.
- Changed: `compress` option now use cssnano v2.x
([#166](https://github.com/MoOx/postcss-cssnext/issues/166))
- Added: CLI output file dirname is now automatically created (using `mkdirp`)
([#146](https://github.com/MoOx/postcss-cssnext/issues/146))

# 1.7.1 - 2015-06-19

- Fixed: bullet for browser messages should be visible on Chrome Windows.
Changed from `〉` to `›`

# 1.7.0 - 2015-06-17

- Added: warning to deprecate previous (wrong) custom selectors syntax.
Previously they were working with **and without** pseudo syntax ':'
[which is incorrect according to specs](https://github.com/postcss/postcss-custom-selectors/issues/5#issuecomment-90774654)
Now you must use `@custom-selector :--{name}` syntax instead of
`@custom-selector --{name}`
The support of syntax without : and the warning message will be remove in the
next major release
([#97](https://github.com/MoOx/postcss-cssnext/issues/97))
- Added: `plugins` option that allows you to pipe your own transformations
([#118](https://github.com/MoOx/postcss-cssnext/issues/118))
- Added: `messages` option that allows you to see messages of transformations
([#88](https://github.com/MoOx/postcss-cssnext/issues/88))
- Added: `:any-link` pseudo class support

# 1.6.0 - 2015-06-02

- Added: prevent mutability issues with frozen options objects
([#147](https://github.com/MoOx/postcss-cssnext/pull/147))

# 1.5.2 - 2015-05-27

- Fixed: support for autoprefixer 5.2
([#131](https://github.com/MoOx/postcss-cssnext/issues/131))

# 1.5.1 - 2015-05-25

- Fixed: when printing a bug report in CLI, url was not printed, due to a
replacement of colors lib by chalk in 1.5.0
([#129](https://github.com/MoOx/postcss-cssnext/pull/129))

# 1.5.0 - 2015-05-23

- Changed: `compress` option use [cssnano](https://github.com/ben-eb/cssnano)
instead of CSSWring.

# 1.4.0 - 2015-05-01

- Added: support for `:matches()` selector pseudo class
- Added: support for `:not()` selector pseudo class level 4
(transpiled to level 3)

# 1.3.1 - 2015-05-01

- Fixed: CLI `--watch` doesn't make some duplicate rebuild anymore.

# 1.3.0 - 2015-04-15

- Added: hexadecimal fallback for rgba() color

# 1.2.3 - 2015-04-10

- Fixed: --watch doesn't output console.log() related to watcherd/unwatched
files anymore

# 1.2.2 - 2015-04-09

- Changed: upgrade chokidar to stable 1.0.0 (used for cssnext --watch)

# 1.2.1 - 2015-03-02

- Fixed: remove some deprecation notice related to postcss 4.1
([postcss#272](https://github.com/postcss/postcss/issues/272))

# 1.2.0 - 2015-04-02

- Added: pseudoElements single colon fallback for pseudoElements double colons
- Added: `--watch` CLI option now checks for changes in imported files

# 1.1.0 - 2015-03-05

- Added: `--config` CLI option
- Added: `--browsers`CLI option

# 1.0.1 - 2015-02-18

- Fixed: cssnext binary doesn't exit on an error if --watch is enabled
([#69](https://github.com/MoOx/postcss-cssnext/pull/69))

# 1.0.0 - 2015-02-06

- Changed: upgraded to postcss v4.x
- Changed: `import` is not considered as a `feature` anymore, but is now
directly an option for the API.
It is still enabled by default.

Before

```js
cssnext({
  features: {
    import: {
      root: "./src"
    }
  }
})
```

After

```js
cssnext({
  import: {
    root: "./src"
  }
})
```

- Added: `url` option: non absolute url() are now rebased according to `from`
(and `to` options if provided). Enabled by default.
- Added: `compress` option now accept CSSWring options directly.
- Added: `browsers` option can enable or disable features and is propagated to
autoprefixer
- Added: px fallback for `rem` unit

# 0.6.6 - 2014-12-22

- Fixed: `Cannot find module 'exit'` error when an error came out
([#54](https://github.com/MoOx/postcss-cssnext/issues/54))

# 0.6.5 - 2014-12-16

- Added: [media queries range](http://dev.w3.org/csswg/mediaqueries/#mq-ranges)
feature ([ref](https://github.com/postcss/postcss-media-minmax))
- Added: [filter](http://www.w3.org/TR/filter-effects/) feature
([ref](https://github.com/iamvdo/pleeease-filters))

# 0.6.4 - 2014-12-11

- Changed: upgrade postcss-import to 4.0.0 for windows compatibility
- Added: Windows compatibility (by building test on AppVeyor)

# 0.6.3 - 2014-12-09

- Changed: upgrade to csswring v2.0.0 (postcss 3 ready). This is removing the
boring warnings.
- Changed: update postcss-custom-selectors reference (with an S)

# 0.6.2 - 2014-12-04

- Added: [custom selectors](http://dev.w3.org/csswg/css-extensions/#custom-selectors) feature ([ref](https://github.com/postcss/postcss-custom-selector)).

# 0.6.1 - 2014-12-01

- Changed: update to postcss-calc v3 (which add `precision` & `preserve`) &
some useless minor updates
- Changed: standalone version is now uglified (`dist/cssnext.js`)

# 0.6.0 - 2014-11-24

- Changed: upgrade to postcss-import v3 which allow to easily consume
node_modules
- Changed: "prefixes" feature is now "autoprefixer"
- Added: cssnext can be used as a postcss plugin

# 0.5.0 - 2014-11-13

- Fixed: cssnext returns a string only if the first parameter is a real string
(typeof === string)
- Changed: upgrade to postcss 3
- Changed: if sourcemap is set to true, default map is now true since postcss
v3.0.0 have by default `{inline: true, sourceContent: true}`
- Changed: upgrade read-file-stdin from 0.0.4 to 0.2.0

# 0.4.4 - 2014-11-11

- Fixed: bug introduced by `options` mutations
([gulp-cssnext#1](https://github.com/cssnext/gulp-cssnext/issues/1))

# 0.4.3 - 2014-11-09

- Added: font-variant support
([#42](https://github.com/MoOx/postcss-cssnext/issues/42))

# 0.4.2 - 2014-11-02

- Fixed: support !important for custom properties
([#12](https://github.com/postcss/postcss-custom-properties/issues/12))
- Added: echo a warning when using a non root custom properties
([#13](https://github.com/postcss/postcss-custom-properties/issues/13))
- Added: cssnext can return a postcss instance of no string given
([#3](https://github.com/MoOx/postcss-cssnext/issues/3))

# 0.4.1 - 2014-11-01

- Added: gray() support
([#44](https://github.com/MoOx/postcss-cssnext/issues/44))

# 0.4.0 - 2014-10-23

- Changed: color feature has been exploded to multiples features
([#40](https://github.com/MoOx/postcss-cssnext/issues/40)).

Before

```js
var output = cssnext(input, {
  features: {
    // providing `true` (or omitting this value) instead of the following object
    //  was the default behavior
    color: {
      color: true
      hexAlpha: true
      hwb: true
      rebeccapurple: true
    }
  }
})
```

Now

```js
var output = cssnext(input, {
  // as usual if you where using all features, you can just omit this values
  features: {
    colorFunction: true,
    colorHexAlpha: true,
    colorHwb: true,
    colorRebeccapurple: true
    }
  }
})
```

- Changed: cssnext options are not passed to all plugins anymore. You know need
to specify feature options by passing object to `features` properties  
([#39](https://github.com/MoOx/postcss-cssnext/issues/39)).

Before

```js
//eg: preserve custom properties
var output = cssnext(input, {
  preserve: true
})
```

Now

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

- Added: more control on sourcemap is possible using the new `map` option
(direct postcss option).
Using this option make `sourcemap` one to be ignored and change the return value
 of `cssnext()` (object instead of string)

This change have been made to avoid collision between options
(of each features).

# 0.3.1 - 2014-08-27

- Fixed: nested custom properties usages
([#25](https://github.com/MoOx/postcss-cssnext/issues/25))

# 0.3.0 - 2014-08-26

- Added: better custom properties fallbacks
(thanks to postcss-custom-properties 0.3.0)

# 0.2.3 - 2014-08-26

- Fixed: support empty files
([#24](https://github.com/MoOx/postcss-cssnext/issues/24))

# 0.2.2 - 2014-08-22

- Fixed: missing `bin` in npm files...

# 0.2.1 - 2014-08-22

- Fixed: missing `bin` in `package.json` for npm

# 0.2.0 - 2014-08-20

- Changed: `from` option doesn't enable `sourcemap` automatically anymore

# 0.1.0 - 2014-08-19

✨ First release
