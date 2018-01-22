import React, { Component } from "react";
import PropTypes from "prop-types";

import Html from "../modules/Html";
import Head from "../modules/Head";
import Body from "../modules/Body";

class Simple extends Component {
  getChildContext() {
    return {
      pkg: this.props.pkg,
      // collections: this.props.collections,
      file: this.props.file
    };
  }

  render() {
    const { file } = this.props;
    const footer = file.footer === undefined ? true : file.footer;

    if (!file.title) {
      console.log(`${file.filename} doesn't have a title`);
    }
    return (
      <Html>
        <Head
          title={file.title}
          stylesheets={this.props.metadata.assets.stylesheets}
        />
        <Body
          scripts={[
            ...(file.scripts || []),
            ...(this.props.metadata.assets.scripts || [])
          ]}
          version={this.props.metadata.assets.version}
          footer={footer}
        >
          <div
            className={file.className || ""}
            dangerouslySetInnerHTML={{ __html: file.contents }}
          />
        </Body>
      </Html>
    );
  }
}

Simple.propTypes = {
  pkg: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  // collections: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired
};

Simple.childContextTypes = {
  pkg: PropTypes.object.isRequired,
  // collections: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired
};

export default Simple;
