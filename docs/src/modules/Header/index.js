import React, { Component } from "react";
import PropTypes from "prop-types";

import SVGIcon from "react-svg-inline";
import requireRaw from "../requireRaw";

import Link from "./link";

class Header extends Component {
  render() {
    return (
      <header className="cssnext-Header js-Headroom">
        <div style={{ background: "#000", color: "#fff", textAlign: "center" }}>
          <a href="https://moox.io/blog/deprecating-cssnext/">
            <code>postcss-cssnext</code> has been deprecated in favor or{" "}
            <code>postcss-preset-env</code>. Read more.
          </a>
        </div>
        <div className="r-Grid">
          <div className="r-Grid-cell r-minM--4of6">
            <span className="cssnext-Header-nav">
              <a className="cssnext-Header-logo" href="/">
                <SVGIcon
                  cleanup
                  svg={requireRaw("./src/assets/cssnext.svg")}
                  className="cssnext-Header-logo-img"
                />
                <span className="cssnext-Header-version">
                  {this.context.pkg.version}
                </span>
              </a>
              <Link href={"/features/"}>{"Features"}</Link>
              <Link href={"/setup/"}>{"Setup"}</Link>
              <Link href={"/usage/"}>{"Usage"}</Link>
              <Link href={"/playground/"}>{"Playground"}</Link>
            </span>
          </div>
          <div className="r-Grid-cell r-minM--2of6">
            <div className="cssnext-Header-nav">
              <Link href="https://gitter.im/MoOx/postcss-cssnext">
                {"Support"}
              </Link>
              <Link
                href="https://github.com/MoOx/postcss-cssnext"
                title="GitHub"
              >
                {"GitHub"}
              </Link>
              <Link href="https://twitter.com/cssnext" title="Twitter">
                {"Twitter"}
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.contextTypes = {
  pkg: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired
};

export default Header;
