# Contributing

_cssnext uses a lot of [postcss](https://github.com/postcss) plugins,
so you might need to take a look at them if you find an issue or want to create
or enhance a feature._

Otherwise, fork, work on a branch, install dev-dependencies,
respect coding style & run tests before submitting a bug fix or a feature.

```console
$ git clone https://github.com/YOU/cssnext.git
$ npm install
$ npm test
$ git checkout -b fix.bug423
```

`npm test` will compile what is need to be and run all tests.
If you want to work on one test only, you can run something like

```console
$ babel-tape-runner src/__tests__/option.browsers.js
```

_Be sure to have in your PATH `./node_modules/.bin` so you can use local
module directly in console._

## Details

### Add a feature

1. Add test files (input + expected output) in [`src/__tests__/fixtures/features`](src/__tests__/features)
- If the feature can affect some others, update [`src/__tests__/fixtures/cases/example.css`](src/__tests__/cases/example.css) to test integration with other features

- Choose a pretty simple and clear name (that match the specs)
- Add the feature in the [README features list](#features) (title, link to spec, link of the plugin, short desc)
- Add the feature in the [README node.js options list](#features-default-all-features) (camelCaseName)
- Add the dependency in the [`package.json`](package.json)
- Add the feature in the source (in [`index.js`](index.js)), in the appropriate place (order matter)
For now, use a empty function instead of the right module
- Run test, & check tests are broken (otherwise feature is useless)
Now, call the right plugin
- Run test and be happy
- Add feature in [the docs](docs/content)
- Add feature on [the playground](docs/content/playground.html) example


### Edit messages styles

- default styles are in src/option.messages.browser.styles.js
- test render by running: `babel-node src/__tests__/messages`.
Styles will be compiled, rendered in a web page & the webpage will be opened for
you.
