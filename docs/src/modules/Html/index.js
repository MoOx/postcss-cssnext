import React, { Component, PropTypes } from "react"

class Html extends Component {

  render() {
    return (
      <html lang="fr" className="r-VerticalRhythm">
        { this.props.children }
      </html>
    )
  }
}

Html.propTypes = {
  children: PropTypes.array.isRequired,
}

export default Html
