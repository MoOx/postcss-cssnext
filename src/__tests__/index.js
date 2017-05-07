import tape from "tape"

import utils from "./utils"
import postcssnext from ".."

tape("postcss-cssnext is a postcss plugin", (t) => {
  t.ok(
    typeof postcssnext.process === "function",
    "should have the postcss process() function available"
  )

  t.end()
})

tape("cssnext regression test", (t) => {
  const input = utils.readFixture("regression")
  const expected = utils.readFixture("regression.expected")
  const actual = postcssnext({ browsers: "IE 6" }).process(input).css.trim()

  utils.write(utils.fixturePath("regression.actual"), actual)

  t.equal(
    actual,
    expected.trim(),
    "should pass the regression"
  )

  t.end()
})
