---
title: Discover cssnext features
backgroundModifier: darkRoad
incomplete: true
---

## automatic vendor prefixes

(via [autoprefixer](https://github.com/postcss/autoprefixer)),


## [custom properties & `var()`](http://www.w3.org/TR/css-variables/)

limited to `:root`
([⇗](https://github.com/postcss/postcss-custom-properties)),

## [reduced `calc()`](https://github.com/MoOx/reduce-css-calc#readme)

to optimize previously parsed `var()` references
([⇗](https://github.com/postcss/postcss-calc)),

## [custom media queries](http://dev.w3.org/csswg/mediaqueries/#custom-mq)

a nice way to have semantic media queries
([⇗](https://github.com/postcss/postcss-custom-media)),

## [media queries ranges](http://dev.w3.org/csswg/mediaqueries/#mq-ranges)

that allows to replace min-/max- with `<=` & `>=` (syntax easier to read)
([⇗](https://github.com/postcss/postcss-media-minmax)),

## [custom selectors](http://dev.w3.org/csswg/css-extensions/#custom-selectors)

to create your own selectors
([⇗](https://github.com/postcss/postcss-custom-selector)),

## [`color()`](http://dev.w3.org/csswg/css-color/#modifying-colors)

a color function to modify colors (transpiled to: `rgba()`)
([⇗](https://github.com/postcss/postcss-color-function)),

## [`hwb()`](http://dev.w3.org/csswg/css-color/#the-hwb-notation)

similar to `hsl()` but easier for humans to work with (transpiled to: `rgba()`)
([⇗](https://github.com/postcss/postcss-color-hwb)) ,

## [`gray()`](http://dev.w3.org/csswg/css-color/#grays)

(transpiled to: `rgba()`)
([⇗](https://github.com/postcss/postcss-color-gray)),

## [#rrggbbaa](http://dev.w3.org/csswg/css-color/#hex-notation)

(transpiled to: `rgba()`)
([⇗](https://github.com/postcss/postcss-color-hex-alpha)),

## [`rebeccapurple`](http://dev.w3.org/csswg/css-color/#valdef-color-rebeccapurple)

([⇗](https://github.com/postcss/postcss-color-rebeccapurple)),


## [font-variant](http://dev.w3.org/csswg/css-fonts/#propdef-font-variant)

properties (fallback: `font-feature-settings`)
([⇗](https://github.com/postcss/postcss-font-variant)),

## [filter](http://www.w3.org/TR/filter-effects/)

properties (fallback: inlined `<svg>` filter)
([⇗](https://github.com/iamvdo/pleeease-filters))

## [`rem` units](http://www.w3.org/TR/css3-values/#rem-unit)

(fallback: `px`)
([⇗](https://github.com/robwierzbowski/node-pixrem))

## [pseudo-elements](http://www.w3.org/TR/css3-selectors/#pseudo-elements)

(adjust `::` to `:`)
([⇗](https://github.com/axa-ch/postcss-pseudoelements))

## [`:matches` pseudo-class](http://dev.w3.org/csswg/selectors-4/#matches)

([⇗](https://github.com/postcss/postcss-selector-matches))


## [`:not` pseudo-class](http://dev.w3.org/csswg/selectors-4/#negation)

([⇗](https://github.com/postcss/postcss-selector-NOT))


## alpha colors for browser that don't understand [css 3 colors](http://www.w3.org/TR/css3-color/)
 (fallback: solid hexa colors)
([⇗](https://github.com/postcss/postcss-color-rgba-fallback))

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
