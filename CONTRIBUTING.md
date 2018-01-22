# Contributing

_postcss-cssnext uses a lot of [postcss](https://github.com/postcss) plugins, so
you might need to take a look at them if you find an issue or want to create or
enhance a feature._

Otherwise, fork, work on a branch, install dev-dependencies, respect coding
style & run tests before submitting a bug fix or a feature.

```console
$ git clone https://github.com/YOU/postcss-cssnext.git
$ npm install
$ npm test
$ git checkout -b fix.bug423
```

`npm test` will compile what is need to be and run all tests. If you want to
work on one test only, you can run something like

```console
$ babel-tape-runner src/__tests__/option.browsers.js
```

_Be sure to have in your PATH `./node_modules/.bin` so you can use local module
directly in console._

## Details

### Add a feature

1. Add test files (input + expected output) in
   [`src/__tests__/fixtures/features`](src/__tests__/features)

* Choose a pretty simple and clear name (that match the specs), if you are not
  sure, ask using an issue.
* Add the feature in :
  * `docs/content/index.md` (http://cssnext.io/)
  * `docs/content/features.md` (http://cssnext.io/features/) with an example +
    link to specs like others features
* Add the dependency in the [`package.json`](package.json) (use
  `npm install --save postcss-...`)
* Add the feature in the source (in [`src/features.js`](src/features.js)), in
  the appropriate place (order matter) For now, use a empty function instead of
  the right module
* Run test, & check tests are broken (otherwise feature is useless) Now, call
  the right plugin in the function you just created
* Run test and be happy
* Add feature on [the playground](docs/content/playground.html) example
