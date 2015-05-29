import React, {Component, PropTypes} from "react"

import SVGIcon from "../SVGIcon"
import requireRaw from "../requireRaw"

export default class Footer extends Component {

  static contextTypes = {
    file: PropTypes.object.isRequired,
  }

  static defaultProps = {
    plagryound: true,
  }

  static propTypes = {
    plagyround: PropTypes.bool,
  }

  render() {
    return (
      <footer className="cssnext-Footer">
        <p>
          <SVGIcon
            svg={requireRaw("./src/assets/cssnext.svg")}
            className="cssnext-Header-logo-img"
            style={{
              height: "1rem",
              verticalAlign: "middle",
            }}
          />
          {" is brought to you by "}
          <a href="https://twitter.com/MoOx">@MoOx</a>
          {" & "}
          <a href="https://github.com/cssnext/cssnext/graphs/contributors">
            some other contributors
          </a>.
        </p>
        <small>
          <a href="it-s-cssnext-not-CSSNext">
            {"Note: it's cssnext, not CSSNext"}
          </a>
          <span style={{
            opacity: ".4",
            marginLeft: "1rem",
          }}>
            <a href="credits">
              Credits
            </a>
            {" | "}
            <a href={
              "https://github.com/cssnext/cssnext/edit/master/" +
              "docs/content/" + this.context.file.filename
            }>
              Edit this page
            </a>
          </span>
        </small>
      </footer>
    )
  }
}
