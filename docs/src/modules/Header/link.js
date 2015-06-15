import React, {Component, PropTypes} from "react"
import cx from "classnames"

export default class HeaderLink extends Component {

  static propTypes = {
    href: PropTypes.string.isRequired,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
    ]),
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
  }

  static contextTypes = {
    file: PropTypes.object.isRequired,
  }

  render() {
    const currentUrl = "/" + this.context.file.url

    return (
      <a
        {...this.props}
        className={cx({
          ...(
            this.props.className
              ? {[this.props.className]: true}
              : {}
          ),
          "cssnext-Header-nav-item": true,
          "cssnext-Header-nav-item--active": currentUrl === this.props.href,
        })}
      >
        {this.props.children}
      </a>
    )
  }
}
