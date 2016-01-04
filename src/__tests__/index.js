import tape from "tape"

import postcssnext from ".."

tape("postcss-cssnext is a postcss plugin", (t) => {
  t.ok(
    typeof postcssnext.process === "function",
    "should have the postcss process() function available"
  )

  t.end()
})
