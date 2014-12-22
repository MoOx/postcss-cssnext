# 0.6.6 - 2014-12-22

- Fix `Cannot find module 'exit'` error when an error came out ([#54](https://github.com/cssnext/cssnext/issues/54))

# 0.6.5 - 2014-12-16

- Add [media queries range](http://dev.w3.org/csswg/mediaqueries/#mq-ranges) feature ([ref](https://github.com/postcss/postcss-media-minmax))
- Add [filter](http://www.w3.org/TR/filter-effects/) feature ([ref](https://github.com/iamvdo/pleeease-filters))

# 0.6.4 - 2014-12-11

- Ensure Windows compatibility (by building test on AppVeyor)
- Upgrade postcss-import to 4.0.0 for windows compatibility

# 0.6.3 - 2014-12-09

- Upgrade to csswring v2.0.0 (postcss 3 ready). This is removing the boring warnings.
- Update postcss-custom-selectors reference (with an S)

# 0.6.2 - 2014-12-04

- Add [custom selectors](http://dev.w3.org/csswg/css-extensions/#custom-selectors) feature ([ref](https://github.com/postcss/postcss-custom-selector)).

# 0.6.1 - 2014-12-01

- Update to postcss-calc v3 (which add `precision` & `preserve`) & some useless minor updates
- Standalone version is now uglified (`dist/cssnext.js`)

# 0.6.0 - 2014-11-24

- Upgrade to postcss-import v3 which allow to easily consume node_modules
- cssnext can be used as a postcss plugin
- "prefixes" feature is now "autoprefixer"

# 0.5.0 - 2014-11-13

- Upgrade to postcss 3
- If sourcemap is set to true, default map is now true since postcss v3.0.0 have by default `{inline: true, sourceContent: true}`
- Upgrade read-file-stdin from 0.0.4 to 0.2.0
- Cssnext returns a string only if the first parameter is a real string (typeof === string)

# 0.4.4 - 2014-11-11

- Fixed a bug introduced by `options` mutations ([ref](https://github.com/cssnext/gulp-cssnext/issues/1))

# 0.4.3 - 2014-11-09

- Add font-variant support ([ref](https://github.com/cssnext/cssnext/issues/42))

# 0.4.2 - 2014-11-02

- Support !important for custom properties ([ref](https://github.com/postcss/postcss-custom-properties/issues/12))
- Echo a warning when using a non root custom properties ([ref](https://github.com/postcss/postcss-custom-properties/issues/13))
- Cssnext can return a postcss instance of no string given ([ref](https://github.com/cssnext/cssnext/issues/3))

# 0.4.1 - 2014-11-01

- Add gray() support ([ref](https://github.com/cssnext/cssnext/issues/44))

# 0.4.0 - 2014-10-23

- Color feature has been exploded to multiples features ([issue](https://github.com/cssnext/cssnext/issues/40)).

Before

```js
var output = cssnext(input, {
  features: {
    // providing `true` (or omitting this value) instead of the following object was the default behavior
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

- Cssnext options are not passed to all plugins anymore. You know need to specify feature options by passing object to `features` properties  ([issue](https://github.com/cssnext/cssnext/issues/39)).

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

- More control on sourcemap is possible using the new `map` option (direct postcss option). Using this option make `sourcemap` one to be ignored and change the return value of `cssnext()` (object instead of string)

This change have been made to avoid collision between options (of each features).

# 0.3.1 - 2014-08-27

- Fix nested custom properties usages ([#25](https://github.com/cssnext/cssnext/issues/25))

# 0.3.0 - 2014-08-26

- Better custom properties fallbacks (thanks to postcss-custom-properties 0.3.0)

# 0.2.3 - 2014-08-26

- Support empty files ([#24](https://github.com/cssnext/cssnext/issues/24))

# 0.2.2 - 2014-08-22

- Add missing `bin` in npm files...

# 0.2.1 - 2014-08-22

- Add missing `bin` in `package.json` for npm

# 0.2.0 - 2014-08-20

- `from` option doesn't enable `sourcemap` automatically anymore

# 0.1.0 - 2014-08-19

First release
