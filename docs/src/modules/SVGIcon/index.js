import React, {Component, PropTypes} from "react"
// import styled from "bloody-react-styled"
import cx from "classnames"

// import styles from "./styles"

const cleanups = {
  // some useless stuff for us
  // that svgo doesn't remove
  title: /<title>.*<\/title>/gi,
  desc: /<desc>.*<\/desc>/gi,
  comment: /<!--.*-->/gi,
  defs: /<defs>.*<\/defs>/gi,

  // remove hardcoded dimensions
  width: / +width="\d+(\.\d+)?(px)?"/gi,
  height: / +height="\d+(\.\d+)?(px)?"/gi,

  // remove fill
  fill: / +fill=\"(none|#[0-9a-f]+)\"/gi,

  // Sketch.app shit
  sketchMSShapeGroup: / +sketch:type=\"MSShapeGroup\"/gi,
  sketchMSPage: / +sketch:type=\"MSPage\"/gi,
  sketchMSLayerGroup: / +sketch:type=\"MSLayerGroup\"/gi,
}

// @styled(styles)
export default class SVGIcon extends Component {

  static defaultProps = {
    component: "span",
    classSuffix: "-svg",
    cleanup: [],
    cleanupExceptions: [],
  }

  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    svg: PropTypes.string.isRequired,
    fill: PropTypes.string,
    cleanup: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.array,
    ]),
    width: PropTypes.string,
    height: PropTypes.string,
  }

  static cleanupSvg(svg, cleanup = []) {
    return Object.keys(cleanups)
      .filter(key => cleanup.includes(key))
      .reduce((acc, key) => {
        return acc.replace(cleanups[key], "")
      }, svg)
      .trim()
  }

  render() {
    const {
      className,
      component,
      svg,
      fill
    } = this.props

    let cleanup = this.props.cleanup
    if (
      // simple way to enable entire cleanup
      cleanup === true ||
      // passing cleanupExceptions enable cleanup as well
      (
        this.props.cleanup.length === 0 &&
        this.props.cleanupExceptions.length > 0
      )
    ) {
      cleanup = Object.keys(cleanups)
    }
    cleanup = cleanup.filter(
      key => {
        return !this.props.cleanupExceptions.includes(key)
      }
    )

    let {
      width,
      height
    } = this.props

    if (width && height === undefined) {
      height = width
    }

    const props = {...this.props}
    // remove useless props for wrapper
    delete props.svg
    delete props.fill
    delete props.width
    delete props.height

    const classes = cx({
      "SVGIcon": true,
      "SVGIcon--cleaned": cleanup.length,
      [className]: className,
    })
    const svgClasses = classes
      .split(" ")
      .join(this.props.classSuffix + " ") + this.props.classSuffix

    return (
      React.createElement(
        component,
        {
          ...props, // take most props
          className: classes,
          dangerouslySetInnerHTML: {
            __html: SVGIcon.cleanupSvg(svg, cleanup).replace(
              /<svg/,
              `<svg class="${ svgClasses }"` +
              (
                fill
                ? ` fill="${ fill }"`
                : ``
              ) +
              (
                width || height
                ? (
                  ` style="` +
                    (width ? `width: ${width};` : ``) +
                    (height ? `height: ${height};` : ``) +
                  `"`
                )
                : ""
              )
            ),
          },
        }
      )
    )
  }
}
