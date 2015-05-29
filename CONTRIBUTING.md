## Contributing

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

### Add a feature

1. Add test files (input + expected output) in [`test/fixtures/features`](test/features)
- If the feature can affect some others, update [`test/fixtures/cases/example.css`](test/cases/example.css) to test integration with other features
- Run test, & check tests are broken (otherwise feature is useless)
- Choose a pretty simple and clear name (that match the specs)
- Add the feature in the [README features list](#features) (title, link to spec, link of the plugin, short desc)
- Add the feature in the [README node.js options list](#features-default-all-features) (camelCaseName)
- Add the dependency in the [`package.json`](package.json)
- Add the feature in the source (in [`index.js`](index.js)), in the appropriate place (order matter)
- Run test and be happy
- Add feature in [the docs](docs/content)
- Add feature on [the playground](https://github.com/cssnext/playground) example
