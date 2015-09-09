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
  version,
  source,
  input,
  expected
) {
  const options = { features: { } }

  // disable all features
  Object.keys(features).forEach(function(key) {
    options.features[key] = false
  })

  const css = cssnext(options).process(input).css
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

  t.equal(
    cssnext(options).process(input).css.trim(),
    expected.trim(),
    version + ": should add " + feature + " support"
  )
}

Object.keys(features).forEach(function(name) {
  const slug = toSlug(name)
  const source = utils.fixturePath(join("features", slug))
  const input = utils.readFixture(join("features", slug))
  const expected = utils.readFixture(join("features", slug + ".expected"))

  test(slug, function(t) {
    testFeature(t, name, "node.js", source, input, expected)

    t.end()
  })
})
