// http://jsbin.com/jebohepawa/2/edit
//
export default {
  display: "block",

  // not a problem for old browsers, box will still be on top of body
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,

  "font-size": ".9em",
  padding: "1.5em 1em 1.5em 4em", // padding + background image padding

  color: "#318edf",
  "background-color": "#fff",

  /* eslint-disable max-len */
  background: (
    /*
     * icon: logo svg inlined
     *  (encodeURIComponent({ svgcontent without prologue and doctype }))
     * for automation, see https://github.com/filamentgroup/directory-encoder/blob/master/lib/svg-uri-encoder.js
     */
    `url(
      "data:image/svg+xml;charset=utf-8,%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0A%09%20width%3D%22381.488px%22%20height%3D%22512px%22%20viewBox%3D%220%200%20381.488%20512%22%20enable-background%3D%22new%200%200%20381.488%20512%22%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cg%3E%0A%09%0A%09%09%3ClinearGradient%20id%3D%22SVGID_1_%22%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%2296.2642%22%20y1%3D%22711.0186%22%20x2%3D%2296.2641%22%20y2%3D%221223.0186%22%20gradientTransform%3D%22matrix(1%200%200%201%200%20-711.0195)%22%3E%0A%09%09%3Cstop%20%20offset%3D%220%22%20style%3D%22stop-color%3A%23428BCA%22%2F%3E%0A%09%09%3Cstop%20%20offset%3D%220.325%22%20style%3D%22stop-color%3A%23507DBF%22%2F%3E%0A%09%09%3Cstop%20%20offset%3D%221%22%20style%3D%22stop-color%3A%235C70B5%22%2F%3E%0A%09%3C%2FlinearGradient%3E%0A%09%3Cpath%20fill%3D%22url(%23SVGID_1_)%22%20d%3D%22M6.338%2C238.675c14.948%2C0%2C27.244-5.52%2C36.917-16.743c9.565-11.121%2C16.342-26.833%2C20.077-47.23%0A%09%09L81.336%2C72.069c2.196-13.424%2C5.921-24.759%2C11.174-33.966c5.13-9.272%2C11.067-16.663%2C17.555-22.274%0A%09%09c6.659-5.52%2C13.857-9.539%2C21.889-12.104C140.11%2C1.235%2C148.147%2C0%2C156.168%2C0h36.361l-5.099%2C31.103h-27.805%0A%09%09c-6.782%2C0-12.74%2C1.475-17.849%2C4.366c-4.981%2C2.913-8.988%2C6.653-12.035%2C11.212c-3.201%2C4.697-5.526%2C9.822-7.193%2C15.61%0A%09%09c-1.812%2C5.691-3.19%2C11.367-4.441%2C16.684L100.27%2C181.606c-2.629%2C13.841-6.921%2C25.464-12.724%2C34.934%0A%09%09c-5.676%2C9.4-11.885%2C16.882-18.389%2C22.407c-6.472%2C5.611-12.874%2C9.678-19.089%2C12.179c-6.087%2C2.485-10.929%2C3.864-14.392%2C4.275v1.111%0A%09%09c2.624%2C0.412%2C6.359%2C1.523%2C10.79%2C3.458c4.44%2C1.939%2C8.87%2C5.136%2C13.151%2C9.55c4.409%2C4.425%2C8.15%2C10.031%2C11.335%2C16.727%0A%09%09c3.057%2C6.729%2C4.548%2C15.311%2C4.548%2C25.673c0%2C5.393-0.54%2C11.548-1.78%2C18.484L55.872%2C433.021c-1.112%2C5.756-1.657%2C11.891-1.657%2C18.416%0A%09%09c0%2C8.006%2C1.657%2C14.984%2C5.114%2C20.724c3.452%2C5.809%2C10.373%2C8.722%2C20.767%2C8.722h27.682L102.082%2C512H65.71%0A%09%09c-14.247%2C0-26.282-3.746-36.249-11.276c-10.095-7.545-15.07-20.67-15.07-39.481c0-3.126%2C0.267-6.37%2C0.545-9.806%0A%09%09c0.417-3.464%2C0.973-7.337%2C1.801-11.484l17.86-102.653c1.09-7.337%2C1.779-14.23%2C1.779-20.746c0-13.83-3.062-24.491-8.989-32.042%0A%09%09C21.435%2C277.008%2C12.302%2C273.262%2C0%2C273.262L6.338%2C238.675z%22%2F%3E%0A%09%0A%09%09%3ClinearGradient%20id%3D%22SVGID_2_%22%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22188.3286%22%20y1%3D%22814.2812%22%20x2%3D%22188.3286%22%20y2%3D%221119.7139%22%20gradientTransform%3D%22matrix(1%200%200%201%200%20-711.0195)%22%3E%0A%09%09%3Cstop%20%20offset%3D%220%22%20style%3D%22stop-color%3A%23428BCA%22%2F%3E%0A%09%09%3Cstop%20%20offset%3D%220.325%22%20style%3D%22stop-color%3A%23507DBF%22%2F%3E%0A%09%09%3Cstop%20%20offset%3D%221%22%20style%3D%22stop-color%3A%235C70B5%22%2F%3E%0A%09%3C%2FlinearGradient%3E%0A%09%3Cpath%20fill%3D%22url(%23SVGID_2_)%22%20d%3D%22M228.516%2C103.263l-47.604%2C305.432h-32.77l47.588-305.432H228.516z%22%2F%3E%0A%09%0A%09%09%3ClinearGradient%20id%3D%22SVGID_3_%22%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22252.4248%22%20y1%3D%22831.083%22%20x2%3D%22252.4248%22%20y2%3D%221102.8955%22%20gradientTransform%3D%22matrix(1%200%200%201%200%20-711.0195)%22%3E%0A%09%09%3Cstop%20%20offset%3D%220%22%20style%3D%22stop-color%3A%23428BCA%22%2F%3E%0A%09%09%3Cstop%20%20offset%3D%220.325%22%20style%3D%22stop-color%3A%23507DBF%22%2F%3E%0A%09%09%3Cstop%20%20offset%3D%221%22%20style%3D%22stop-color%3A%235C70B5%22%2F%3E%0A%09%3C%2FlinearGradient%3E%0A%09%3Cpath%20fill%3D%22url(%23SVGID_3_)%22%20d%3D%22M285.21%2C120.064l-42.18%2C271.813h-23.392l42.33-271.813H285.21z%22%2F%3E%0A%09%0A%09%09%3ClinearGradient%20id%3D%22SVGID_4_%22%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22312.3252%22%20y1%3D%22843.6572%22%20x2%3D%22312.3252%22%20y2%3D%221090.3115%22%20gradientTransform%3D%22matrix(1%200%200%201%200%20-711.0195)%22%3E%0A%09%09%3Cstop%20%20offset%3D%220%22%20style%3D%22stop-color%3A%23428BCA%22%2F%3E%0A%09%09%3Cstop%20%20offset%3D%220.325%22%20style%3D%22stop-color%3A%23507DBF%22%2F%3E%0A%09%09%3Cstop%20%20offset%3D%221%22%20style%3D%22stop-color%3A%235C70B5%22%2F%3E%0A%09%3C%2FlinearGradient%3E%0A%09%3Cpath%20fill%3D%22url(%23SVGID_4_)%22%20d%3D%22M339.441%2C132.639l-38.316%2C246.653H285.21l38.322-246.653H339.441z%22%2F%3E%0A%09%0A%09%09%3ClinearGradient%20id%3D%22SVGID_5_%22%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22360.6729%22%20y1%3D%22861.7842%22%20x2%3D%22360.6729%22%20y2%3D%221072.2061%22%20gradientTransform%3D%22matrix(1%200%200%201%200%20-711.0195)%22%3E%0A%09%09%3Cstop%20%20offset%3D%220%22%20style%3D%22stop-color%3A%23428BCA%22%2F%3E%0A%09%09%3Cstop%20%20offset%3D%220.325%22%20style%3D%22stop-color%3A%23507DBF%22%2F%3E%0A%09%09%3Cstop%20%20offset%3D%221%22%20style%3D%22stop-color%3A%235C70B5%22%2F%3E%0A%09%3C%2FlinearGradient%3E%0A%09%3Cpath%20fill%3D%22url(%23SVGID_5_)%22%20d%3D%22M381.488%2C150.766l-32.774%2C210.421h-8.855l32.646-210.421H381.488z%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A"
    ) 1em / 2em calc(2em / 0.82) no-repeat, #fff`
  ),
  /* eslint-enable max-len */

  // sugar
  "border-bottom": "4px solid #318edf",
  "box-shadow": "0 0 .6em rgba(0,0,0, .25)",

  // nice font
  "white-space": "pre-wrap",
  "font-family": "Menlo, Monaco, monospace",
  "text-shadow": "0 1px #fff",
}
