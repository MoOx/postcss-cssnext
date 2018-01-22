import tape from "tape";

import postcss from "postcss";
import cssnext from "..";
import { resetWarning } from "../warn-for-deprecations";

const reportFail = t => error => {
  console.log(error);
  t.fail();
};

tape("cssnext warnForDeprecation option", t => {
  const messages = [];
  resetWarning();
  const instance = postcss([
    cssnext({
      console: { log: msg => messages.push(msg) }
    })
  ]);

  instance.process("body{}").then(() => {
    t.equal(
      messages.length,
      0,
      "should not add warning there is no deprecated stuff"
    );
    t.end();
  }, reportFail(t));
});

tape("cssnext warnForDeprecation option", t => {
  const messages = [];
  resetWarning();
  const instance = postcss([
    cssnext({
      console: { log: msg => messages.push(msg) }
    })
  ]);

  instance
    .process(
      `
:root {
  --toolbar-theme: {
    border: 1px solid green;
  };
}
.Toolbar {
  @apply --toolbar-theme;
  @apply --toolbar-theme;
}
  `
    )
    .then(() => {
      t.equal(
        messages.length,
        1,
        "should add a single warning if there are deprecated stuff"
      );
      t.end();
    }, reportFail(t));
});
