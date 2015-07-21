// why this plugin ?
// https://github.com/postcss/postcss-messages/issues/16

import postcss from "postcss"
import colors from "chalk"

// http://www.w3.org/TR/CSS2/syndata.html#characters
// tl;dr: escape as utf-16 all non ascii chars + new lines & quotes
function escapeForCSS(string) {
  let newString = ""
  for (let i = 0; i < string.length; i++) {
    const ch = string.charAt(i)
    switch (ch) {
    case "\n":
    case "\r":
      newString += "\\A "
      break

    case "\\":
    case "\'":
    case "\"":
      newString += "\\" + ch
      break

    default:
      // non ascii
      if (!ch.match(/^[\x00-\x7F]*$/)) {
        let hexCh = string.charCodeAt(i).toString(16)
        while (hexCh.length < 4) {
          hexCh = "0" + hexCh
        }
        // space at the end is required
        newString += "\\" + hexCh + " "
        continue
      }
      newString += string[i]
    }
  }

  return newString
}

export default postcss.plugin(
  "postcss-messages",
  (options) => {
    options = {
      ...options,
    }

    if (options.disabled) {
      return function() {}
    }

    const defaultStyles = {
      // ...
    }
    const styles = options.styles
      ? options.styles
      : defaultStyles

    return (css, result) => {
      const messages = result.warnings()
      if (messages.length === 0) {
        return
      }

      let selector = "html::before"
      if (options.selector) {
        selector = options.selector
      }
      else {
        css.eachRule(rule => {
          if (
            rule.selector === "html::before" ||
            rule.selector === "html:before"
          ) {
            selector = "html::after"
          }
        })
      }

      css.append({selector})
      Object.keys(styles).forEach(key => {
        css.last.append({
          prop: key,
          value: styles[key],
        })
      })

      const bullet = "›"
      const content = messages.map(message => message.toString())
        .join(`\n\n\n${ bullet } `)

      css.last.append({
        prop: "content",
        value: (
          "\"" +
          escapeForCSS(`${ bullet } ${ colors.stripColor(content) }`) +
          "\""
        ),
      })
    }
  }
)
