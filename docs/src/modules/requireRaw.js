const BAD_ENV = "Cannot require raw file from the current environnement"

const fs = require ? require("fs") : null
const path = require ? require("path") : null

/* eslint-disable import/no-mutable-exports */
let requireRaw = () => {
  return BAD_ENV
}

if (fs && fs.readFileSync) {
  requireRaw = (filename) => {
    return fs.readFileSync(
      path.join(__dirname, "..", "..", filename),
      { encoding: "utf8" }
    )
  }
}

export default requireRaw
