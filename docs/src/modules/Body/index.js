import React, { Component, PropTypes } from "react"

import Header from "../Header"
import Footer from "../Footer"
import Analytics from "../Analytics"

class Body extends Component {
  render() {
    const {
      version,
      scripts,
      footer,
    } = this.props

    return (
      <body className="cssnext-Body">

        <Header />

        { this.props.children }

        <Footer playground={ footer } />
        {
          scripts.map(script => (
            <script key={ script } src={ `${ script }?${ version }` }></script>
          ))
        }

        <Analytics />
      </body>
    )
  }
}

Body.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  scripts: PropTypes.array,
  version: PropTypes.string,
  footer: PropTypes.bool,
}

Body.contextTypes = {
  pkg: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired,
}

Body.defaultProps = {
  scripts: [],
  footer: true,
}

export default Body
