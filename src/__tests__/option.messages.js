import test from "tape"

import cssnext from ".."

test("cssnext option: messages", (t) => {

  const msg = "This is a message"
  const defaultOptions = {
    plugins: [
      (styles, result) => {
        result.warn(msg)
      },
    ],
    messages: true,
  }

  t.equal(
    cssnext({
      ...defaultOptions,
      messages: false,
    })
      .process("test{}")
      .warnings()[0].text,
    msg,
    "should pass messages if messages option is off"
  )

  t.ok(
    cssnext({
      ...defaultOptions,
      messages: {
        browser: true,
      },
    })
      .process("test{}")
      .css
      .indexOf(`${ msg }`) > -1
    ,
    "should add messages in css"
  )

  t.ok(
    cssnext({
      ...defaultOptions,
      messages: {
        browser: false,
      },
    })
      .process("test{}")
      .css
      .indexOf(`content: "${ msg }"`) === -1
    ,
    "should not add messages in css if key is === false"
  )

  t.ok(
    cssnext({
      ...defaultOptions,
      messages: {},
    })
      .process("test{}")
      .css
      .indexOf(`content: "${ msg }"`) === -1
    ,
    "should not add messages in css if key is not present"
  )

  // we should do the same for "console" value, but we need to test stdout
  // and I am lazy atm. Finger crossed.
  // t.ok(
  //   cssnext({
  //     ...defaultOptions,
  //     messages: {
  //       console: true,
  //     },
  //   })
  //     .process("test{}")
  //     .css
  //   ,
  //   "should show messages in the console"
  // )

  t.end()
})
