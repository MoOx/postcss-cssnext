const cssnext = require("../")
const t = require("microtime")

let input = require("fs").readFileSync(
  "./src/__tests__/benchmarks.css",
  {encoding: "utf8"}
)

// make a 2MB input
for (let i = 0; i <= 10; i++) {
  input += input
}
// check the real input
// require("fs").writeFileSync("./src/__tests__/fixtures/bench.css", input)

// test each features
const keys = Object.keys(cssnext.features)
const allOff = {}

keys.forEach(function(k) {
  allOff[k] = false
})

console.log("Each features is tested on a 2MB input (>100 000 lines)\n")

keys.forEach(function(k) {
  const enable = {...allOff}
  enable[k] = true
  const start = t.now()
  cssnext(input, {features: enable})
  const stop = t.now()

  console.log(k + " takes " + ((stop - start) / 1000000) + "s") // , enable)
})
