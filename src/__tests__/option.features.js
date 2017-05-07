/**
 * Test dependencies
 */
import test from "tape"
import { join } from "path"

import utils from "./utils"
import cssnext, { features } from ".."

/**
 * Features tests
 */
import toSlug from "to-slug-case"
const testFeature = function(
  t,
  feature,
  source,
  input,
  expected,
  slug
) {
  const options = { features: { } }

  const browsers = utils.readFixtureBrowsers(join("features", slug))

  if (browsers) {
    options.browsers = browsers
  }

  // disable all features
  Object.keys(features).forEach(function(key) {
    options.features[key] = false
  })

  const css = cssnext(options).process(input).css
  t.notEqual(
    css,
    expected,
    "should not add " + feature + " support if disabled"
  )
  t.equal(
    css,
    input,
    "should not modify input if  " + feature + " is disabled"
  )

  // enable only the one we want to test...
  options.features[feature] = true

  const actual = cssnext(options).process(input).css.trim()
  utils.write(utils.fixturePath(join("features", slug + ".actual")), actual)

  t.equal(
    actual,
    expected.trim(),
    "should add " + feature + " support"
  )
}

Object.keys(features).forEach(function(name) {
  const slug = toSlug(name)
  const source = utils.fixturePath(join("features", slug))
  const input = utils.readFixture(join("features", slug))
  const expected = utils.readFixture(join("features", slug + ".expected"))

  test(slug, function(t) {
    testFeature(t, name, source, input, expected, slug)

    t.end()
  })
})
