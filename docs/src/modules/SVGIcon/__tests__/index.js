import tape from "tape-catch"
import React, {Component} from "react"
import SVGIcon from ".."

tape("SVGIcon", (test) => {

  test.equal(
    React.renderToStaticMarkup(
      <SVGIcon className="TestSVG" svg="<svg><g></g></svg>" />
    ),
    `<span class="SVGIcon TestSVG"><svg class="SVGIcon-svg TestSVG-svg"` +
      `><g></g></svg></span>`,
    "passes & merges className"
  )

  test.equal(
    React.renderToStaticMarkup(
      <SVGIcon
        component="div"
        className="TestSVG"
        svg="<svg><g></g></svg>"
      />
    ),
    `<div class="SVGIcon TestSVG"><svg class="SVGIcon-svg TestSVG-svg"` +
      `><g></g></svg></div>`,
    "parent component can be chosen by tagName"
  )

  class TestComponent extends Component {
    render() {
      return (
        <div {...this.props} className="foo" />
      )
    }
  }

  test.equal(
    React.renderToStaticMarkup(
      <SVGIcon
        component={TestComponent}
        className="TestSVG"
        svg="<svg><g></g></svg>" />
    ),
    `<div class="foo"><svg class="SVGIcon-svg TestSVG-svg"><g></g></svg>` +
      `</div>`,
    "parent composite component can be chosen"
  )

  const svgPiece = `width="24" height="16px"><g fill="none"><path ` +
    `fill="#ab234f"></path></g></svg>`
  const SVGIconStart = `<span class="SVGIcon"><svg class="SVGIcon-svg"`
  const SVGIconCleanedStart = `<span class="SVGIcon SVGIcon--cleaned">` +
    `<svg class="SVGIcon-svg SVGIcon--cleaned-svg"`

  test.equal(
    React.renderToStaticMarkup(
      <SVGIcon svg={`<svg ${svgPiece}`} />
    ),
    `${SVGIconStart} ${svgPiece}</span>`,
    "doesn't cleanup the svg by default"
  )

  test.equal(
    React.renderToStaticMarkup(
      <SVGIcon cleanup svg={`<svg ${svgPiece}`} />
    ),
    `${SVGIconCleanedStart}><g><path></path></g></svg></span>`,
    "can cleanup the svg"
  )

  test.equal(
    React.renderToStaticMarkup(
      <SVGIcon cleanupExceptions={["fill"]} svg={`<svg ${svgPiece}`} />
    ),
    `${SVGIconCleanedStart}><g fill="none"><path fill="#ab234f"></path></g>` +
      `</svg></span>`,
    "cleanup the svg with exceptions"
  )

  test.equal(
    React.renderToStaticMarkup(
      <SVGIcon svg={`<svg><g></g></svg>`} width="1rem" />
    ),
    `${SVGIconStart} style="width: 1rem;height: 1rem;"><g></g></svg></span>`,
    "should add width (and height automatically)"
  )

  test.equal(
    React.renderToStaticMarkup(
      <SVGIcon svg={`<svg><g></g></svg>`} width="1rem" height="auto" />
    ),
    `${SVGIconStart} style="width: 1rem;height: auto;"><g></g></svg></span>`,
    "should add width & height"
  )

  test.equal(
    React.renderToStaticMarkup(
      <SVGIcon svg={`<svg><g></g></svg>`} height="1rem" />
    ),
    `${SVGIconStart} style="height: 1rem;"><g></g></svg></span>`,
    "should add height"
  )

  test.end()
})
