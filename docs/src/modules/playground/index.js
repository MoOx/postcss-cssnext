var cssnext = require("../../../../")
var cssnextVersion = require("../../../../package").version

function playground(opts) {
  opts.options = opts.options || {}

  if (!opts.from || !opts.to || !opts.console) {
    throw new Error(
      "cssnextPlayground needs at least `from`, `to` & `console` parameters"
    )
  }

  function cssnextify() {
    var css = opts.from.value

    opts.console.innerHTML = ""
    var converted = opts.to.value

    try {
      converted = cssnext(css, opts.options)
      opts.to.value = converted.trim()
    }
    catch (e) {
      console.error(e)
      opts.to.value = ""
      opts.console.innerHTML =
        "<small class=\"cssnext-Playground-console-footer\"><br /><br />" +
        "If you think it's a bug, please " +
        "<a href=\"https://github.com/cssnext/cssnext/issues\">report it</a>." +
        "<br /><small><em>cssnext v" + cssnextVersion +
        "</em></small></small>"
      // use createTextNode to escape html entities
      opts.console.insertBefore(
        document.createTextNode(e.toString()),
        opts.console.firstChild
      )
    }
  }

  opts.from.addEventListener("change", cssnextify)
  opts.from.addEventListener("keyup", cssnextify)

  cssnextify()
}

Array.prototype.slice.call(
  document.querySelectorAll(".js-cssnext-Playground")
).forEach(function(elPlayground) {
  playground({
    from: elPlayground.querySelector(".js-cssnext-Playground-from"),
    to: elPlayground.querySelector(".js-cssnext-Playground-to"),
    console: elPlayground.querySelector(".js-cssnext-Playground-console"),
  })
})
