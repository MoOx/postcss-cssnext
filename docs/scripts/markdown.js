import hljs from "highlight.js";

export default {
  html: true,
  linkify: true,
  typographer: true,
  highlight: (code, lang) => {
    code = code.trim();
    // language is recognized by highlight.js
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code).value;
    }
    // fallback to auto
    return hljs.highlightAuto(code).value;
  }
};
