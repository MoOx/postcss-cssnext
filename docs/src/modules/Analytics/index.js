import React, { Component } from "react"

import isogram from "isogram"

export default class Analytics extends Component {

  render() {
    return (
      <script
        dangerouslySetInnerHTML={{
          // new line so people actually see it at the end of the page
          // on the last line ^^
          __html: "\n" +
          isogram(
            "csSnext",
            {
              id: "UA-55403963-1",
              minify: true,
            }
          ),
        }}
      ></script>
    )
  }
}
