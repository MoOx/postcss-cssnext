// why this plugin ?
// https://github.com/postcss/postcss-messages/issues/16

import postcss from "postcss"

export default postcss.plugin("postcss-messages", function(opts) {
  if (opts && opts.disabled === true) {
    return function() {}
  }

  var defaultStyles = {}

  var styles = (opts && opts.styles ? opts.styles : defaultStyles)

  return function(css, result) {
    var warnings = result.warnings()
    if (warnings.length === 0) {
      return
    }

    var selector = "html::before"
    if (opts && opts.selector) {
      selector = opts.selector
    }
    else {
      css.eachRule(function(rule) {
        if (
          rule.selector === "html::before" ||
          rule.selector === "html:before"
        ) {
          selector = "html::after"
        }
      })
    }

    css.append({selector: selector})
    for (var style in styles) {
      if (styles.hasOwnProperty(style)) {
        css.last.append({prop: style, value: styles[style]})
      }
    }

    // http://www.evotech.net/articles/testjsentities.html
    // 〉
    const bullet = "\\0232A  "
    var content = warnings.map(function(message) {
      return message.toString().replace(/"/g, "\\\"")
    }).join("\\00000a\\00000a" + bullet)

    css.last.append({
      prop: "content",
      value: "\"" + bullet + content + "\"",
    })
  }
})
