/**
 * Test dependencies
 */
const test = require("tape")

const utils = require("./utils")
const cssnext = require("..")
const cssnextStandalone = require("../cssnext")

/**
 * Features tests
 */
const toSlug = require("to-slug-case")
const testFeature = function(
  t,
  feature,
  cssnextInstance,
  version,
  source,
  input,
  expected
) {
  const options = {from: source, sourcemap: false, features: {}}

  // disable all features
  Object.keys(cssnextInstance.features).forEach(function(key) {
    options.features[key] = false
  })

  const css = cssnextInstance(input, options)
  t.notEqual(
    css,
    expected,
    version + ": should not add " + feature + " support if disabled"
  )
  t.equal(
    css,
    input,
    version + ": should not modify input if  " + feature + " is disabled"
  )

  // enable only the one we want to test...
  options.features[feature] = true

  // ...except "url" because we want to validate its behaviour when integrated
  // with "import"
  if (feature === "url") {
    options.features.import = true
  }
  t.equal(
    cssnextInstance(input, options).trim(),
    expected.trim(),
    version + ": should add " + feature + " support"
  )
}

Object.keys(cssnext.features).forEach(function(name) {
  const slug = toSlug(name)
  const source = utils.fixturePath("features/" + slug)
  const input = utils.readFixture("features/" + slug)
  const expected = utils.readFixture("features/" + slug + ".expected")

  test(slug, function(t) {
    testFeature(t, name, cssnext, "node.js", source, input, expected)

    // we do not support @import  or url rewriting in the browser
    if (name === "import" || name === "url") {
      t.end()
      return
    }

    testFeature(t, name, cssnextStandalone, "browser", source, input, expected)

    t.end()
  })
})
