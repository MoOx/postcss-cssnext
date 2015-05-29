/* eslint no-script-url: 0 */
import path from "path"

import marked from "marked"
import hljs from "highlight.js"

// https://github.com/chjj/marked/blob/master/lib/marked.js#L1096
function unescape(html) {
  return html.replace(/&([#\w]+);/g, function(_, n) {
    n = n.toLowerCase()
    if (n === "colon") {
      return ":"
    }
    if (n.charAt(0) === "#") {
      return n.charAt(1) === "x"
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1))
    }
    return ""
  })
}

function rebaseUrl(baseHref, currentPath, uri) {
  // don't touch non relative uri
  if (
    // skip absolute url
    uri.indexOf("/") === 0 ||
    // datauris
    uri.indexOf("data:") === 0 ||
    // internal links
    // uri.indexOf("#") === 0 ||
    // protocol based
    /^[a-z]+:\/\//.test(uri)
  ) {
    return uri
  }
  else {
    // make it absolute
    return baseHref + path.normalize(path.join(currentPath, uri))
  }
}

const renderer = new marked.Renderer()
const headingIds = {}
renderer.heading = function(text, level, raw) {
  const escaped = raw
      // url in lower case are cool
      .toLowerCase()

      // dashify
      // .replace(/[^\w]+/g, "-")
      .replace(/\W+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")

  const key = this.options.__metalsmith.__filename + "#" + escaped
  if (!headingIds[key]) {
    headingIds[key] = 0
  }
  headingIds[key]++
  const id = escaped + (
    headingIds[key] > 1 ? `-${headingIds[key]}` : ""
  )

  return (
    `<h${level} id="${id}">
      <a class="cssnext-Title-anchor" href="${
        rebaseUrl(
          this.options.__metalsmith.baseHref,
          path.dirname(this.options.__metalsmith.__filename),
          "#" + id
        )
      }">#</a>
      ${text}
    </h${level}>`
  )
}

renderer.link = function(href, title, text) {

  // DON'T PLAY WITH US OK ?
  // (this came from original marked source code and should remain I think)
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, "")
        .toLowerCase()
    }
    catch (e) {
      return ""
    }

    if (
      prot.indexOf("javascript:") === 0 ||
      prot.indexOf("vbscript:") === 0
    ) {
      return ""
    }
  }

  return `<a href="${
    rebaseUrl(
      this.options.__metalsmith.baseHref,
      path.dirname(this.options.__metalsmith.__filename),
      href
    )
  }" ${title ? ` title="${title}"` : ``}>${text}</a>`
}

renderer.image = function(href, title, text) {
  return (
    `<img src="${
      rebaseUrl(
        this.options.__metalsmith.baseHref,
        path.dirname(this.options.__metalsmith.__filename),
        href
      )
    }" alt="${text}"` +
    `${title ? ` title="${title}"` : ``}` +
    `${this.options.xhtml ? "/>" : ">"}`
  )
}

marked.setOptions({

  renderer: renderer,

  highlight: (code, language) => {
    code = code.trim()

    // language is recognized by highlight.js
    if (hljs.getLanguage(language)) {
      return hljs.highlight(language, code).value
    }

    // fallback to auto
    return hljs.highlightAuto(code).value
  },

  gfm: true,
  tables: true,
  smartypants: true,
})

export default marked
