import stripColor from "strip-ansi";

import cssnext from "../../../../src/index";
import { version as cssnextVersion } from "../../../../package";
import messagesStyles from "./messages.styles";

const bullet = "›";

function playground(opts) {
  opts.options = opts.options || {};

  if (!opts.from || !opts.to || !opts.console) {
    throw new Error(
      "cssnextPlayground needs at least `from`, `to` & `console` parameters"
    );
  }

  const transformer = cssnext(opts.options);

  function transformCSS() {
    const css = opts.from.value;

    opts.console.innerHTML = "";
    opts.messages.textContent = "";

    try {
      const result = transformer.process(css);
      opts.to.value = result.css.trim();
      const messages = result.warnings();
      if (messages.length) {
        opts.messages.textContent = `${bullet} ${stripColor(
          messages.map(message => message.toString())
        ).join("\n\n\n" + bullet + " ")}`;
      }
    } catch (e) {
      console.error(e);
      opts.to.value = "";
      opts.console.innerHTML =
        '<small class="cssnext-Playground-console-footer"><br /><br />' +
        "If you think it's a bug, please " +
        '<a href="https://github.com/MoOx/postcss-cssnext/issues">' +
        "report it</a>." +
        "<br /><small><em>cssnext v" +
        cssnextVersion +
        "</em></small></small>";
      // use createTextNode to escape html entities
      opts.console.insertBefore(
        document.createTextNode(e.toString()),
        opts.console.firstChild
      );
    }
  }

  opts.from.addEventListener("change", transformCSS);
  opts.from.addEventListener("keyup", transformCSS);

  transformCSS();
}

Array.prototype.slice
  .call(document.querySelectorAll(".js-cssnext-Playground"))
  .forEach(function(elPlayground) {
    playground({
      from: elPlayground.querySelector(".js-cssnext-Playground-from"),
      to: elPlayground.querySelector(".js-cssnext-Playground-to"),
      console: elPlayground.querySelector(".js-cssnext-Playground-console"),
      messages: elPlayground.querySelector(".js-cssnext-Playground-messages"),
      options: {
        messages: false
      }
    });
  });

const messagesStylesElement = document.createElement("style");
const adjustedMessagesStyles = {
  ...messagesStyles,
  position: undefined,
  "border-top": messagesStyles["border-bottom"],
  "border-bottom": undefined,
  "box-shadow": undefined
};
messagesStylesElement.innerHTML = `.cssnext-Playground-messages {
  ${Object.keys(adjustedMessagesStyles)
    .map(
      prop =>
        adjustedMessagesStyles[prop] !== undefined
          ? prop + ": " + adjustedMessagesStyles[prop]
          : null
    )
    .filter(couple => couple !== null)
    .join(";\n  ")}
}

.cssnext-Playground-messages:empty { display: none }`;
document.body.appendChild(messagesStylesElement);
