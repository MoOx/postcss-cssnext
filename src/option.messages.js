import postcssMessagesConsole from "postcss-reporter"
// https://github.com/postcss/postcss-browser-reporter/issues/16
// import postcssBrowserReporter from "postcss-browser-reporter"
import postcssBrowserReporter from "./plugins/messages"
import postcssBrowserReporterStyles from "./option.messages.browser.styles.js"

export default (options) => {
    // true === all interfaces
  if (options.messages === true) {
    return [
      postcssBrowserReporter({styles: postcssBrowserReporterStyles}),
      postcssMessagesConsole,
    ]
  }

  // object: only the one you want
  if (typeof options.messages === "object") {
    return [
      ...options.messages.browser
      ? [
        postcssBrowserReporter({
          styles: postcssBrowserReporterStyles,
          ...(
            typeof options.messages.browser === "object"
            ? options.messages.browser
            : {}
          ),
        }),
      ]
      : [],
      ...options.messages.console
      ? [
        postcssMessagesConsole({
          ...(
            typeof options.messages.console === "object"
            ? options.messages.console
            : {}
          ),
        }),
      ]
      : [],
    ]
  }

  // otherwise nothing :)
  return []
}
