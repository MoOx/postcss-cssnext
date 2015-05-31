---
title: Discover cssnext features
backgroundModifier: darkRoad
incomplete: true
---

## automatic vendor prefixes([⇗](https://github.com/postcss/autoprefixer))
[PostCSS](https://github.com/postcss/postcss) plugin to parse CSS and add vendor prefixes to CSS rules using values
from [Can I Use].
```css
:fullscreen a {
    display: flex
}
```

you will get

```css
:-webkit-full-screen a {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex
}
:-moz-full-screen a {
    display: flex
}
:-ms-fullscreen a {
    display: -ms-flexbox;
    display: flex
}
:fullscreen a {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex
}
```

## [custom properties & `var()`](http://www.w3.org/TR/css-variables/)([⇗](https://github.com/postcss/postcss-custom-properties))
[PostCSS](https://github.com/postcss/postcss) plugin to transform [W3C CSS Custom Properties for cascading variables](http://www.w3.org/TR/css-variables/) syntax to more compatible CSS.
```css
:root {
  --color: red;
}

div {
  color: var(--color);
}
```

you will get:

```css
div {
  color: red;
}
```
## [reduced `calc()`](https://github.com/MoOx/reduce-css-calc#readme)([⇗](https://github.com/postcss/postcss-calc))
[PostCSS](https://github.com/postcss/postcss) plugin to reduce `calc()`.
```css
.foo {
  calc(3rem * 2 - 1rem)
}
.bar {
  calc(calc(calc(1rem * 0.75) * 1.5) - 1px)
}
```

you will get

```css
.foo {
  5rem
}
.bar {
  calc(1.125rem - 1px)
}
```
## [custom media queries](http://dev.w3.org/csswg/mediaqueries/#custom-mq)([⇗](https://github.com/postcss/postcss-custom-media))
[PostCSS](https://github.com/postcss/postcss) plugin to transform [W3C CSS Custom Media Queries](http://dev.w3.org/csswg/mediaqueries/#custom-mq) syntax to more compatible CSS.
```css
@custom-media --small-viewport (max-width: 30em);

@media (--small-viewport) {
  /* styles for small viewport */
}
```

you will get:

```css
@media (max-width: 30em) {
  /* styles for small viewport */
}
```

## [media queries ranges](http://dev.w3.org/csswg/mediaqueries/#mq-ranges)([⇗](https://github.com/postcss/postcss-media-minmax))
Writing simple and graceful media queries that allows to replace min-/max- with `<=` & `>=` (syntax easier to read)
```css
@media screen and (width >= 500px) and (width <= 1200px) {
  .bar {
    display: block;
  }
}
```

You will get：

```css
@media screen and (min-width: 500px) and (max-width: 1200px) {
  .bar {
    display: block;
  }
}
```

## [custom selectors](http://dev.w3.org/csswg/css-extensions/#custom-selectors)([⇗](https://github.com/postcss/postcss-custom-selectors))
[PostCSS](https://github.com/postcss/postcss) plugin to transform  [W3C CSS Extensions(Custom Selectors)](http://dev.w3.org/csswg/css-extensions/#custom-selectors)  to more compatible CSS.
```css
@custom-selector :--heading h1, h2, h3, h4, h5, h6;

article :--heading + p {
  margin-top: 0;
}
```

you will get:

```css
article h1 + p,
article h2 + p,
article h3 + p,
article h4 + p,
article h5 + p,
article h6 + p {
  margin-top: 0;
}
```

## [`color()`](http://dev.w3.org/csswg/css-color/#modifying-colors)([⇗](https://github.com/postcss/postcss-color-function))
[PostCSS](https://github.com/postcss/postcss) plugin to transform [W3C CSS color function][specs] to more compatible CSS.

```css
body {
  background: color(red a(90%))
}
```
you will get:

```css
body {
  background: rgba(255, 0, 0, 0.9)
}
```

## [`hwb()`](http://dev.w3.org/csswg/css-color/#the-hwb-notation)([⇗](https://github.com/postcss/postcss-color-hwb))

[PostCSS](https://github.com/postcss/postcss) plugin to transform [W3C CSS hwb() color](http://dev.w3.org/csswg/css-color/#the-hwb-notation) to more compatible CSS (rgb() (or rgba())).

```css
body {
  color: hwb(90, 0%, 0%, 0.5);
}
```

you will get:

```css
body {
  color: rgba(128, 255, 0, 0.5);
}
```

## [`gray()`](http://dev.w3.org/csswg/css-color/#grays)([⇗](https://github.com/postcss/postcss-color-gray))
[PostCSS](https://github.com/postcss/postcss) plugin to transform [gray()](http://dev.w3.org/csswg/css-color/#grays) function to today's CSS
```css
.foo {
  color: gray(0);
}

.bar {
  color: gray(255, 50%);
}

.baz {
  color: gray;
}
```

you will get

```css
.foo {
  color: rgb(0, 0, 0);
}

.bar {
  color: rgba(255, 255, 255, 0.5);
}

.baz {
  color: gray;
}
```

## [#rrggbbaa](http://dev.w3.org/csswg/css-color/#hex-notation)([⇗](https://github.com/postcss/postcss-color-gray))
[PostCSS](https://github.com/postcss/postcss) plugin to transform [W3C RGBA hexadecimal notations (#RRGGBBAA or #RGBA)](http://dev.w3.org/csswg/css-color/#hex-notation) to more compatible CSS (rgba()).
```css
body {
  background: #9d9c
}

```

you will get:

```css
body {
  background: rgba(153, 221, 153, 0.8)
}
```

## [`rebeccapurple`](http://dev.w3.org/csswg/css-color/#valdef-color-rebeccapurple)([⇗](https://github.com/postcss/postcss-color-hex-alpha))
[PostCSS](https://github.com/postcss/postcss) plugin to transform [W3C CSS `rebeccapurple` color](http://dev.w3.org/csswg/css-color/#valdef-color-rebeccapurple) to more compatible CSS (rgb()).
```css
body {
  color: rebeccapurple
}

```

you will get:

```css
body {
  color: rgb(102, 51, 153);
}
```

## [font-variant](http://dev.w3.org/csswg/css-fonts/#propdef-font-variant)([⇗](https://github.com/postcss/postcss-font-variant)),
[PostCSS](https://github.com/postcss/postcss) plugin to transform [W3C CSS font variant](http://dev.w3.org/csswg/css-fonts/#propdef-font-variant) properties to more compatible CSS (font-feature-settings).
```css
h2 {
  font-variant-caps: small-caps;
}

table {
  font-variant-numeric: lining-nums;
}
```

you will get:

```css
h2 {
  font-feature-settings: "c2sc";
  font-variant-caps: small-caps;
}

table {
  font-feature-settings: "lnum";
  font-variant-numeric: lining-nums;
}

```

## [filter](http://www.w3.org/TR/filter-effects/)([⇗](https://github.com/iamvdo/pleeease-filters))
[PostCSS](https://github.com/postcss/postcss) plugin to transform CSS shorthand filters to SVG equivalent.
```css
.blur {
	filter: blur(4px);
}
```
you will get

```css
.blur {
	filter: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feGaussianBlur stdDeviation="4" /></filter></svg>#filter');
	filter: blur(4px);
}
```


## [`rem` units](http://www.w3.org/TR/css3-values/#rem-unit)([⇗](https://github.com/robwierzbowski/node-pixrem))
Pixrem is a CSS post-processor that, given CSS and a root em value, returns CSS with pixel unit fallbacks or replacements.
```css
.sky {
  margin: 2.5rem 2px 3em 100%;
  color: blue;
}

@media screen and (min-width: 20rem) {
  .leaf {
    margin-bottom: 1.333rem;
    font-size: 1.5rem;
  }
}
```

you will get

```css
.sky {
  margin: 80px 2px 3em 100%;
  margin: 2.5rem 2px 3em 100%;
  color: blue;
}

@media screen and (min-width: 20rem) {
  .leaf {
    margin-bottom: 1.333rem;
    font-size: 1.5rem;
  }
}
```

## [pseudo-elements](http://www.w3.org/TR/css3-selectors/#pseudo-elements)([⇗](https://github.com/axa-ch/postcss-pseudoelements))
[PostCSS](https://github.com/postcss/postcss) plugin  to add single and double colon pseudo selectors.
```css
a::before {
  color:red;
}
b::after {
  color:red;
}
```

you will get

```css
a:before {
  color:red;
}
b:after {
  color:red;
}
```

## [`:matches` pseudo-class](http://dev.w3.org/csswg/selectors-4/#matches)([⇗](https://github.com/postcss/postcss-selector-matches))
[PostCSS](https://github.com/postcss/postcss) plugin to transform `:matches()` W3C CSS pseudo class to more compatible CSS selectors
```css
p:matches(:first-child, .special) {
  color: red;
}
```

you will get:

```css
p:first-child, p.special {
  color: red;
}
```

## [`:not` pseudo-class](http://dev.w3.org/csswg/selectors-4/#negation)([⇗](https://github.com/postcss/postcss-selector-NOT))
[PostCSS](https://github.com/postcss/postcss) plugin to transform `:not()` W3C CSS leve 4 pseudo class to :not() CSS level 3 selectors
```css
p:not(:first-child, .special) {
  color: red;
}
```

you will get:

```css
p:not(:first-child), p:not(.special) {
  color: red;
}
```
## alpha colors for browser that don't understand [css 3 colors](http://www.w3.org/TR/css3-color/)([⇗](https://github.com/postcss/postcss-color-rgba-fallback))
[PostCSS](https://github.com/postcss/postcss) plugin to transform rgba() to hexadecimal.
```css
body {
  background: rgba(153, 221, 153, 0.8);
  border: solid 1px rgba(100,102,103,.3);
}

```

you will get:

```css
body {
  background: #99DD99;
  background: rgba(153, 221, 153, 0.8);
  border: solid 1px #646667;
  border: solid 1px rgba(100,102,103,.3);
}
```

_Note that according to your [browser scope](#nodejs-options) some might be not transpiled to avoid extra useless output._

## Bonus features

_<small>The features below are considered as bonus since it's totally not related to CSS specs</small>._

* `@import` inline local files and modules - `node_modules` or `web_modules` ([⇗](https://github.com/postcss/postcss-import)) to output a bundled CSS file. `url()` referenced are also rebased.
* minification is available ([⇗](https://github.com/hail2u/node-csswring)) if you want to compress the output for production.


## @todo

Any omissions of the CSS specifications (even in draft) that are subject to be handled by cssnext are not intentional.
You can take a look at the [list of features that are waiting to be implemented](https://github.com/cssnext/cssnext/issues?q=is%3Aopen+is%3Aissue+label%3Afeature+label%3Aready).
Feel free to work on a feature ready to be added, or [open a new issue](https://github.com/cssnext/cssnext/issues/new) if you find something that should be handled.
Keep in mind that, as of right now, this project is intended to support new CSS *syntax* only.

## Limitations

### Custom properties

The current transformation for custom properties just aims to provide a future-proof way of using a **limited subset (to top-level `:root` selector)** of the features provided by native CSS custom properties.
The transformation is not complete and can't be properly. By injecting selectors with new computed rules, we will break original cascade & unexpected results might happen.

### Font variant

`font-variant` are transformed to `font-feature-settings`. You might take a look at the support of [font feature settings](http://caniuse.com/#feat=font-feature).

### Filter

The W3C filters are only transformed as svg filter using the `url(data:*)` trick for Firefox < 35.
