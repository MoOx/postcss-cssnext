/**
 * Test dependencies
 */
const test = require("tape")

const utils = require("./utils")
const cssnext = require("..")
const postcss = require("postcss")

test("cssnext import option", function(t) {
  const input = utils.readFixture("import")
  const expected = {
    default: utils.readFixture("import.default.expected").trim(),
    options: utils.readFixture("import.options.expected").trim(),
  }
  const opts = {from: "src/__tests__/fixtures/here"}
  function transformFn(c) {
    return c + "\n new {}"
  }
  t.equal(
    cssnext(input, opts).trim(),
    expected.default,
    "should be able to import"
  )
  t.equal(
    cssnext(input, {
      from: opts.from,
      import: {
        transform: transformFn,
      },
    }).trim(),
    expected.options,
    "should be able to import with options"
  )
  t.equal(
    postcss().use(cssnext()).process(input, opts).css.trim(),
    expected.default,
    "should be able to import even as a postcss plugin"
  )
  const importOpt = {
    transform: transformFn,
  }
  Object.freeze(importOpt)
  t.doesNotThrow(function() {
      cssnext(input, {
        from: opts.from,
        import: importOpt,
      }).trim()
    },
    expected.options,
    "should not use original object as option"
  )
  t.end()
})
