import React, {Component, PropTypes} from "react"

export default class Head extends Component {

  static defaultProps = {
    stylesheets: [],
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    stylesheets: PropTypes.array,
  }

  render() {
    return (
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimal-ui"
        />
        <title>{this.props.title}</title>
        {
          this.props.stylesheets.map(stylesheet => (
            <link key={stylesheet} rel="stylesheet" href={stylesheet} />
          ))
        }
        <link
          rel="alternate"
          href="/feed.xml"
          title={this.props.title}
          type="application/atom+xml"
        />
        {this.props.children}
      </head>
    )
  }
}
