---
title: Using postcss-cssnext
subtitle: How to migrate from cssnext to postcss-cssnext
---

## Why **postcss-cssnext**? What is the difference with **cssnext**?

### Short answer: PostCSS

If you're using [PostCSS](https://github.com/postcss/postcss)
in your build process, and were using `cssnext`,
you can quickly switch to only `postcss-cssnext`
(check the [Migration](#migration) section here below).

### Wait? What is PostCSS?

cssnext was at first designed to be a complete tool, before PostCSS became
popular; thus, includes some options that don't really belong in a PostCSS
plugin focused on the future of CSS
(e.g., `import`, `url`, `compress`, `plugins`...) .

These days, most people use [PostCSS](https://github.com/postcss/postcss)
directly (so they can easily adjust and choose their CSS transformations)
so we decided to make integration and of cssnext more simple by providing a
simple (real) plugin.

Also, having to maintain severals cssnext and PostCSS runners that does almost
the same is not optimal.

### Migration

If you were using cssnext with some options here is what you need to know:

#### Options

##### Options `import`, `url`, `compress`, `messages`

- `import` options is just
  [`postcss-import`](https://github.com/postcss/postcss-import)
- `url` option is just
  [`postcss-url`](https://github.com/postcss/postcss-url)
- `compress` option is just
  [`cssnano`](https://github.com/ben-eb/cssnano)
- `messages`: was a combination of
  [`postcss-reporter`](https://github.com/postcss/postcss-reporter)
  and
  [`postcss-browser-reporter`](https://github.com/postcss/postcss-browser-reporter).
  Just pick up the one you want (or both).

##### Option `plugins`

Just add the plugins directly in your PostCSS list.

##### Options `sourcemap`, `map`, `to`, `from`

These options were just proxy to [PostCSS source map options](https://github.com/postcss/postcss/blob/master/docs/source-maps.md).

#### Examples

If you were using cssnext with default options, you might just need this:

```console
$ npm uninstall cssnext [--save[-dev]]
$ npm install postcss postcss-import postcss-url postcss-cssnext postcss-browser-reporter postcss-reporter [--save[-dev]]
```

With the previous lines you might think that you are going backward by having a
more complex boilerplate. But if you look carefully, you will notice that you
might not be interested by some options.

Now that you have the appropriate plugins, here are some examples with some runners
and previous default cssnext behavior.

##### [postcss-cli](https://www.npmjs.com/package/postcss-cli)

```console
$ npm install postcss-cli --save-dev
```

Here is an example of the json config you might use with something like
``$ postcss -c postcss.config.json``.

```js
{
  "use": [
    "postcss-import",
    "postcss-url",
    "postcss-cssnext",
    // add your "plugins" here
    // ...
    // and if you want to compress
    // "cssnano",
    "postcss-browser-reporter",
    "postcss-reporter"
  ]
}
```

##### [grunt-postcss](https://www.npmjs.com/package/grunt-postcss)

```console
$ npm uninstall grunt-cssnext --save-dev
$ npm install grunt-postcss --save-dev
```

```js
grunt.initConfig({
  postcss: {
    options: {
      processors: [
        require("postcss-import")(),
        require("postcss-url")(),
        require("postcss-cssnext")(),
        // add your "plugins" here
        // ...
        // and if you want to compress
        // Disable autoprefixer, because it's already included in cssnext
        // require("cssnano")({ autoprefixer: false }),
        require("postcss-browser-reporter")(),
        require("postcss-reporter")(),
      ]
    },
    dist: {
      src: 'css/*.css'
    }
  }
});
```

##### [gulp-postcss](https://www.npmjs.com/package/gulp-postcss)

```console
$ npm uninstall gulp-cssnext --save-dev
$ npm install gulp-postcss --save-dev
```

```js
var gulp = require('gulp')
var postcss = require('gulp-postcss')

gulp.task('css', function () {
  return (
    gulp.src('./src/*.css')
    .pipe(postcss([
      require("postcss-import")(),
      require("postcss-url")(),
      require("postcss-cssnext")(),
      // add your "plugins" here
      // ...
      // and if you want to compress
      // Disable autoprefixer, because it's already included in cssnext
      // require("cssnano")({ autoprefixer: false }),
      require("postcss-browser-reporter")(),
      require("postcss-reporter")(),
    ]))
    .pipe(gulp.dest('./dest'))
  )
})
```

##### [postcss-loader](https://www.npmjs.com/package/postcss-loader)

```console
$ npm uninstall cssnext-loader --save-dev
$ npm install postcss-loader --save-dev
```

```js
module.exports = {
  module: {
    loaders: [
      {
          test:   /\.css$/,
          loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  postcss: function (webpack) {
    return [
      require("postcss-import")({ addDependencyTo: webpack }),
      require("postcss-url")(),
      require("postcss-cssnext")(),
      // add your "plugins" here
      // ...
      // and if you want to compress,
      // just use css-loader option that already use cssnano under the hood
      require("postcss-browser-reporter")(),
      require("postcss-reporter")(),
    ]
  }
}
```

**With those examples, you got it.
Feel free to adjust the configuration with the appropriate
[PostCSS runner](/setup/#usage).**
