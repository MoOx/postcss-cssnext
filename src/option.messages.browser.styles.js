// not using fs for in browser usage (playground)
//
// source: http://iconmonstr.com/warning-3-icon/
/* eslint-disable max-len */
const svgGradient = `
<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="125.7515" y1="307.4834" x2="125.7514" y2="-73.4854" gradientTransform="matrix(1 0 0 -1 -50 373)">
  <stop  offset="0" style="stop-color:#428BCA"/>
  <stop  offset="0.325" style="stop-color:#507DBF"/>
  <stop  offset="1" style="stop-color:#5C71B6"/>
</linearGradient>`
const warningSVG = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
  ${ svgGradient }
  <path
    fill="url(#SVGID_1_)"
    d="M256.002,50C142.23,50,50,142.229,50,256.001C50,369.771,142.23,462,256.002,462C369.771,462,462,369.771,462,256.001C462,142.229,369.771,50,256.002,50z M256.46,398.518c-16.207,0-29.345-13.139-29.345-29.346c0-16.205,13.138-29.342,29.345-29.342c16.205,0,29.342,13.137,29.342,29.342C285.802,385.379,272.665,398.518,256.46,398.518zM295.233,158.239c-2.481,19.78-20.7,116.08-26.723,147.724c-1.113,5.852-6.229,10.1-12.187,10.1h-0.239c-6.169,0-11.438-4.379-12.588-10.438c-6.1-32.121-24.293-128.504-26.735-147.971c-2.94-23.441,15.354-44.171,38.977-44.171C279.674,113.483,298.213,134.488,295.233,158.239z"
  />
</svg>
`.trim()
/* eslint-enable max-len */

export default {
  display: "block",
  "white-space": "pre-wrap",

  // not a problem for old browsers, box will still be on top of body
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  "z-index": 10000, // just in case you know

  "font-size": ".9em",
  padding: "1.5em 1em 1.5em 4.5em", // padding + background image padding

  color: "#318edf",
  "background-color": "#fff",

  background: (
    `url(
      "data:image/svg+xml;charset=utf-8,${encodeURIComponent(warningSVG)}"
    ) 1em 1em / 2.5em 2.5em no-repeat, #fff`
  ),

  // sugar
  "border-bottom": "4px solid #318edf",
  "box-shadow": "0 0 .6em rgba(0,0,0, .25)",

  // nice font
  "font-family": "Menlo, Monaco, monospace",
}
