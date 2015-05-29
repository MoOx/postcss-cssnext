import React, {Component, PropTypes} from "react"

import Html from "../modules/Html"
import Head from "../modules/Head"
import Body from "../modules/Body"

export default class Simple extends Component {

  static propTypes = {
    pkg: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    // collections: PropTypes.object.isRequired,
    file: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    pkg: PropTypes.object.isRequired,
    // collections: PropTypes.object.isRequired,
    file: PropTypes.object.isRequired,
  }

  getChildContext() {
    return {
      pkg: this.props.pkg,
      // collections: this.props.collections,
      file: this.props.file,
    }
  }

  render() {
    const {
      file,
    } = this.props
    const footer = file.footer === undefined ? true : file.footer

    if (!file.title) {
      console.log(`${file.filename} doesn't have a title`)
    }
    return (
      <Html>
        <Head
          title={file.title}
          stylesheets={this.props.metadata.assets.stylesheets}
        />
        <Body
          scripts={[
            ...file.scripts || [],
            ...this.props.metadata.assets.scripts || [],
          ]}
          footer={footer}
        >
          <div
            className={file.className || ""}
            dangerouslySetInnerHTML={{__html: file.contents}}
          />
        </Body>
      </Html>
    )
  }
}
