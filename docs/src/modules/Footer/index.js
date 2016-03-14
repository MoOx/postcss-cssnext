import React, { Component, PropTypes } from "react"

import SVGIcon from "react-svg-inline"
import requireRaw from "../requireRaw"

class Footer extends Component {
  render() {
    return (
      <footer className="cssnext-Footer">
        <p>
          <SVGIcon
            svg={ requireRaw("./src/assets/cssnext.svg") }
            className="cssnext-Header-logo-img"
          />
          { " is brought to you by " }
          <a href="https://twitter.com/MoOx">
            { "@MoOx" }
          </a>
          { " & " }
          <a href="https://github.com/MoOx/postcss-cssnext/graphs/contributors">
            { "some other contributors" }
          </a>{ "." }
        </p>
        <small>
          <a href="/it-s-cssnext-not-CSSNext">
            { "Note: it's cssnext, not CSSNext" }
          </a>
          <span
            style={ {
              opacity: ".4",
              marginLeft: "1rem",
            } }
          >
            <a href="/credits">
              { "Credits" }
            </a>
            { " | " }
            <a
              href={
                "https://github.com/MoOx/postcss-cssnext/edit/master/" +
                "docs/content/" + this.context.file.filename
              }
            >
              { "Edit this page" }
            </a>
          </span>
        </small>
      </footer>
    )
  }
}

Footer.contextTypes = {
  file: PropTypes.object.isRequired,
}

export default Footer
