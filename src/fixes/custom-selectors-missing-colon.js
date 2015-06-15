import postcss from "postcss"

export default postcss.plugin(
  "cssnext",
  () => {
    const cs = "@custom-selector"

    return (styles, result) => {
      let alert = false
      styles.eachAtRule("custom-selector", rule => {
        if (rule.params.indexOf("--") === 0) {

          // display big warning once
          if (!alert) {
            alert = true
            result.warn(
              `Previously ${ cs } were working with and without pseudo ` +
              `syntax ':'. Now you must use '${ cs } :--{name}' syntax ` +
              `instead of '${ cs } --{name}'. The support of ` +
              `syntax without ':' and this warning will be remove in the ` +
              `next major release.`
            )
          }

          result.warn(
            [
              `Incorrect syntax for ${ cs }.`,
              `  ${ cs } ${ rule.params }`,
              `Should be:`,
              `  ${ cs } :${ rule.params }`,
            ].join("\n\n"),
            {node: rule}
          )

          // fix for postcss-custom-selectors 2.x
          rule.params = ":" + rule.params
        }
      })
    }
  }
)
