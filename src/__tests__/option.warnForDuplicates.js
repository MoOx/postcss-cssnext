import tape from "tape";

import postcss from "postcss";
import autoprefixer from "autoprefixer";
import cssnext from "..";
import { spotted } from "../warn-for-duplicates";

const reportFail = t => error => {
  console.log(error);
  t.fail();
};

tape("cssnext warnForDuplicates option", t => {
  const messages = [];
  spotted.length = 0; // reset spotted plugins
  const instance = postcss([
    cssnext({
      console: { log: msg => messages.push(msg) }
    })
  ]);

  instance.process("body{}").then(() => {
    t.equal(messages.length, 0, "should not add warning if no duplicate");
    t.end();
  }, reportFail(t));
});

tape("cssnext warnForDuplicates option", t => {
  const messages = [];
  spotted.length = 0; // reset spotted plugins
  const instance = postcss([
    autoprefixer(),
    cssnext({
      console: { log: msg => messages.push(msg) }
    })
  ]);

  instance.process("body{}").then(() => {
    t.ok(
      messages[0].indexOf("Warning: postcss-cssnext found a duplicate plugin") >
        -1,
      "should add warning if there are duplicates before"
    );
    t.end();
  }, reportFail(t));
});

tape("cssnext warnForDuplicates option", t => {
  const messages = [];
  spotted.length = 0; // reset spotted plugins
  const instance = postcss([
    autoprefixer(),
    cssnext({
      warnForDuplicates: false,
      console: { log: msg => messages.push(msg) }
    })
  ]);

  instance.process("body{}").then(() => {
    t.equal(
      messages.length,
      0,
      "should NOT add warning if there are duplicates but !warnForDuplicates"
    );
    t.end();
  }, reportFail(t));
});

tape("cssnext warnForDuplicates option", t => {
  const messages = [];
  spotted.length = 0; // reset spotted plugins
  const instance = postcss([
    cssnext({
      console: { log: msg => messages.push(msg) }
    }),
    autoprefixer()
  ]);

  instance.process("body{}").then(() => {
    t.ok(
      messages.length &&
        messages[0].indexOf(
          "Warning: postcss-cssnext found a duplicate plugin"
        ) > -1,
      "should add warning if there are duplicates after"
    );
    t.end();
  }, reportFail(t));
});
