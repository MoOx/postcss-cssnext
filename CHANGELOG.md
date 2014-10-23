# 0.4.0 - 2014-10-23

- color feature has been exploded to multiples features ([issue](https://github.com/cssnext/cssnext/issues/40)).

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

- cssnext options are not passed to all plugins anymore. You know need to specify feature options by passing object to `features` properties  ([issue](https://github.com/cssnext/cssnext/issues/39)).

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

- more control on sourcemap is possible using the new `map` option (direct postcss option). Using this option make `sourcemap` one to be ignored and change the return value of `cssnext()` (object instead of string)

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
