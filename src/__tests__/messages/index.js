import fs from "fs"
import path from "path"

import opn from "opn"

import cssnext from "../.."

console.log("cssnext renderering test for messages styles")

const msg = "This is a message"
const page = path.join("dist", "__tests__styles.html")

const css = cssnext("body{}", {
  plugins: [
    (styles, result) => {
      result.warn(msg)
      result.warn(msg)
      result.warn(msg)
      result.warn(msg)
      result.warn(msg)
    },
  ],
})

fs.writeFileSync(
  page,
  `<!doctype html>
<title>cssnext message rendering test</title>
<style>
${ css }
</style>`,
)

opn(page)
