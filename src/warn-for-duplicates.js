import postcss from "postcss"
import color from "chalk"

const msg = (name) => (
  `Warning: postcss-cssnext found a duplicate plugin ('${ name }') ` +
  "in your postcss plugins. " +
  `This might be inefficient. You should remove '${ name }' from your ` +
  "postcss plugin list since it's already included by postcss-cssnext."
)

let shouldGlobalWarn = true
const globalWarning = (
  "Note: If, for a really specific reason, postcss-cssnext warnings are " +
  "irrelevant for your use case, and you really know what you are doing, " +
  "you can disable this warnings by setting  'warnForDuplicates' option of " +
  "postcss-cssnext to 'false'."
)
export const spotted = []

const warnForDuplicates = postcss.plugin(
  "postcss-warn-for-duplicates",
  (options) => {
    return (style, result) => {
      // https://github.com/postcss/postcss/issues/768
      const { keys, console: messenger } = options
      const pluginNames = []
      result.processor.plugins.forEach((plugin) => {
        const name = plugin.postcssPlugin
        if (
          pluginNames.indexOf(name) > -1 &&
          // warn for cssnext plugins only
          keys.indexOf(name) > -1 &&
          // show warning once
          spotted.indexOf(name) === -1
        ) {
          messenger.log(color.yellow.bold(msg(name)))
          spotted.push(name)
        }
        else {
          pluginNames.push(name)
        }
      })

      if (spotted.length > 0 && shouldGlobalWarn) {
        shouldGlobalWarn = false
        messenger.log(globalWarning)
      }
    }
  }
)

export default warnForDuplicates
