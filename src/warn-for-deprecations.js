import postcss from "postcss"
import color from "chalk"

let shouldGlobalWarn = true
export const resetWarning = () => shouldGlobalWarn = true

const warnForDeprecations = postcss.plugin(
  "postcss-cssnext-warn-for-deprecations",
  ({ console: messenger }) => {
    return (style) => {
        // warn for removed @apply
      style.walkAtRules("apply", () => {
        if (shouldGlobalWarn) {
          shouldGlobalWarn = false
          messenger.log(
color.yellow.bold(
  "You are using @apply rule and custom property sets. \n" +

  "This feature won't be included in next the major release "+
  "of postcss-cssnext. \n"
) +

color.grey(
  "This most likely won't get any more support from browser vendors as the " +
  "spec is yet considered deprecated and alternative solutions are being "+
  "discussed. \n"
) +

  "Read more about the reason here https://github.com/pascalduez/postcss-apply."
          )
        }
      })
    }
  }
)

export default warnForDeprecations
