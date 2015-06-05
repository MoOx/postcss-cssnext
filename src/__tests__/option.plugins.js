import test from "tape"

import cssnext from ".."

test("cssnext option: plugins", (t) => {

  t.equal(
    cssnext(
      ":root{} @notOk",
      {
        plugins: [
          styles => {
            styles.eachAtRule(atRule => {
              atRule.name = "ok"
            })
          },
        ],
      }
    ),
    "@ok",
    "should allow to add custom plugins"
  )

  t.end()
})
