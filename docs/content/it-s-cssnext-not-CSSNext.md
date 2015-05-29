---
title: "It's cssnext, not CSSNext"
footer: false
---

## Is it cssnext or CSSNext or CSSnext?

The official name is **cssnext**, which should never be capitalized, especially not at the start of a sentence, unless it is being displayed in a location that is customarily all-caps (such as the title of man pages).

### Why ?

```js
function nameify(string) {
  return string
    .replace(" ", "")
    .toLowerCase()
}

nameify("CSS Next")
nameify("CSSNext")
nameify("CSSnext")
nameify("CSS next")
nameify("css next")
nameify("cssnext")

// all the results above are just the same
// -> "cssnext" !
```
