---
title: postcss-cssnext features
subtitle: Discover the future of CSS

backgroundModifier: darkRoad
---

@[toc]

**Note that according to your [browser scope](/usage/#browsers) some
transformation can be skipped to avoid extra useless output.**
Eg: if you use don't cover IE 8, rem fallback and rgba fallback might be skipped.

## automatic vendor prefixes

Vendor prefixes are automatically added (and removed if deprecated/useless
depending on your browser scope) using
**[autoprefixer](https://github.com/postcss/autoprefixer)**).


## custom properties &amp; `var()`

The current transformation for custom properties aims to provide a
future-proof way of using a **limited to `:root` selector**
of the features provided by native CSS custom properties.

```css
:root {
  --mainColor: red;
}

a {
  color: var(--mainColor);
}
```

⚠️ [_The definitions are **limited to `:root` selector.**_](https://github.com/postcss/postcss-custom-properties#readme)

[Specification](http://www.w3.org/TR/css-variables/)
|
[Plugin documentation](https://github.com/postcss/postcss-custom-properties)

## custom properties set &amp; `@apply`

Allows you to store a set of properties in a named custom property,
then reference them in other style rules.

```css
:root {
  --danger-theme: {
    color: white;
    background-color: red;
  };
}

.danger {
  @apply --danger-theme;
}
```

⚠️ [_The definitions are **limited to `:root` selector.**_](https://github.com/postcss/postcss-custom-properties#readme)

[Specification](https://tabatkins.github.io/specs/css-apply-rule)
|
[Plugin documentation](https://github.com/pascalduez/postcss-apply)

## reduced `calc()`

Allows you to use safely calc with custom properties by optimizing previously
parsed `var()` references.

```css
:root {
  --fontSize: 1rem;
}

h1 {
  font-size: calc(var(--fontSize) * 2);
}
```

[Specification](https://github.com/MoOx/reduce-css-calc#readme)
|
[Plugin documentation](https://github.com/postcss/postcss-calc)

## custom media queries

A nice way to have semantic media queries

```css
@custom-media --small-viewport (max-width: 30em);
/* check out media queries ranges for a better syntax !*/

@media (--small-viewport) {
  /* styles for small viewport */
}
```

[Specification](http://dev.w3.org/csswg/mediaqueries/#custom-mq)
|
[Plugin documentation](https://github.com/postcss/postcss-custom-media)

## media queries ranges

Allows to replace min-/max- with `<=` & `>=` (syntax easier to read)

```css
@media (width >= 500px) and (width <= 1200px) {
  /* your styles */
}

/* or coupled with custom media queries */
@custom-media --only-medium-screen (width >= 500px) and (width <= 1200px);

@media (--only-medium-screen) {
  /* your styles */
}
```

[Specification](http://dev.w3.org/csswg/mediaqueries/#mq-ranges)
|
[Plugin documentation](https://github.com/postcss/postcss-media-minmax)

## custom selectors

Allows you to create your own selectors

```css
@custom-selector :--button button, .button;
@custom-selector :--enter :hover, :focus;

:--button {
  /* styles for your buttons */
}
:--button:--enter {
  /*
    hover/focus styles for your button

    Read more about :enter proposal
    http://discourse.specifiction.org/t/a-common-pseudo-class-for-hover-and-focus/877
   */
}
```

[Specification](http://dev.w3.org/csswg/css-extensions/#custom-selectors)
|
[Plugin documentation](https://github.com/postcss/postcss-custom-selector)

## nesting

Allows you to nest selectors

```scss
a {
  /* direct nesting (& MUST be the first part of selector)*/
  & span {
    color: white;
  }

  /* @nest rule (for complex nesting) */
  @nest span & {
    color: blue;
  }

  /* media query automatic nesting */
  @media (min-width: 30em) {
    color: yellow;
  }
}
```

[Specification](http://tabatkins.github.io/specs/css-nesting/)
|
[Plugin documentation](https://github.com/jonathantneal/postcss-nesting)

## `color()` function

A color function to modify colors (transpiled to: `rgba()`)

```css
a {
  color: color(red alpha(-10%));
}

  a:hover {
    color: color(red blackness(80%));
  }
```

There is a
[lot of color modifiers available](https://github.com/postcss/postcss-color-function#list-of-color-adjuster),
so be sure to check them !

[Specification](http://dev.w3.org/csswg/css-color/#modifying-colors)
|
[Plugin documentation](https://github.com/postcss/postcss-color-function)

## `hwb()` function

Similar to `hsl()` but easier for humans to work with (transpiled to: `rgba()`).

```css
body {
  color: hwb(90, 0%, 0%, 0.5);
}
```

[Specification](http://dev.w3.org/csswg/css-color/#the-hwb-notation)
|
[Plugin documentation](https://github.com/postcss/postcss-color-hwb)

## `gray()` function

Allows you to use more than 50 shades of gray (transpiled to: `rgba()`).
For the first argument, you can use a number between 0 and 255 or a percentage.

```css
.foo {
  color: gray(85);
}

.bar {
  color: gray(10%, 50%);
}
```

[Specification](http://dev.w3.org/csswg/css-color/#grays)
|
[Plugin documentation](https://github.com/postcss/postcss-color-gray)

## `#rrggbbaa` colors

Allows use to use 4 or 8 digits hexadecimal notation (transpiled to: `rgba()`).

```css
body {
  background: #9d9c;
}
```

[Specification](http://dev.w3.org/csswg/css-color/#hex-notation)
|
[Plugin documentation](https://github.com/postcss/postcss-color-hex-alpha)

## `rgba` function (`rgb` fallback)

Add solid colors fallback for rgba colors
(if your browser scope cover old browsers, eg: IE8).

```css
body {
  background: rgba(153, 221, 153, 0.8);
  /* you will have the same value without alpha as a fallback */
}
```

[Specification](http://www.w3.org/TR/css3-color/)
|
[Plugin documentation](https://github.com/postcss/postcss-color-rgba-fallback)

## `rebeccapurple` color

Allows you to use the new color keyword as a homage to
[Eric Meyer’s daughter](https://github.com/postcss/postcss-color-rebeccapurple#why-this-plugin-)

```css
body {
  color: rebeccapurple;
}
```

[Specification](http://dev.w3.org/csswg/css-color/#valdef-color-rebeccapurple)
|
[Plugin documentation](https://github.com/postcss/postcss-color-rebeccapurple)

## `font-variant` property

properties (fallback: `font-feature-settings`)

```css
h2 {
  font-variant-caps: small-caps;
}

table {
  font-variant-numeric: lining-nums;
}
```

`font-variant` are transformed to `font-feature-settings`. You might take a look
at the support of
[font feature settings](http://caniuse.com/#feat=font-feature).


[Specification](http://dev.w3.org/csswg/css-fonts/#propdef-font-variant)
|
[Plugin documentation](https://github.com/postcss/postcss-font-variant)

## `filter` property

The W3C filters are only transformed as svg filter using the `url(data:*)` trick
for Firefox < 35.

```css
.blur {
    filter: blur(4px);
}
```

[Specification](http://www.w3.org/TR/filter-effects/)
|
[Plugin documentation](https://github.com/iamvdo/pleeease-filters)

## `initial` value

Allow you to use `initial` value for any value. This value represents the value
specified as the property’s initial value. **It does not mean browser default.**

For example, for the `display` property, `initial` always means `inline`,
because that’s the designated initial value of the property.
As an example, using `div { display: initial }`, will **not** be `block`, but
`inline`.

```css
div {
  display: initial; /* inline */
}
```

_Killer feature :_

```css
div {
  all: initial; /* use initial for ALL PROPERTIES in one shot */
}
```

[Specification](http://www.w3.org/TR/css3-values/#common-keywords)
|
[Plugin documentation](https://github.com/maximkoretskiy/postcss-initial)

## `rem` unit (`px` fallback)

`rem` fallback to `px`
(if your browser scope cover old browsers, eg: IE8).

```css
h1 {
  font-size: 1.5rem;
}
```

[Specification](http://www.w3.org/TR/css3-values/#rem-unit)
|
[Plugin documentation](https://github.com/robwierzbowski/node-pixrem)

## `:any-link` pseudo-class

Allows you to use `:any-link` pseudo class.

```css
nav :any-link {
  background-color: yellow;
}
```

[Specification](http://dev.w3.org/csswg/selectors/#any-link-pseudo)
|
[Plugin documentation](https://github.com/jonathantneal/postcss-pseudo-class-any-link)


## `:matches` pseudo-class

Allows you to use `:matches()`.

```css
p:matches(:first-child, .special) {
  color: red;
}
```

[Specification](http://dev.w3.org/csswg/selectors-4/#matches)
|
[Plugin documentation](https://github.com/postcss/postcss-selector-matches)


## `:not` pseudo-class

Allows you to use `:not()` level 4 (which allows multiples selector).
Transformed to `:not()` level 3 (which allow only one selector)`.

```css
p:not(:first-child, .special) {
  color: red;
}
```

[Specification](http://dev.w3.org/csswg/selectors-4/#negation)
|
[Plugin documentation](https://github.com/postcss/postcss-selector-NOT)

## `::` pseudo syntax (`:` fallback)

Adjust `::` to `:`
(if your browser scope cover old browsers, eg: IE8).

```css
a::before {
  /* ... */
}
```

[Specification](http://www.w3.org/TR/css3-selectors/#pseudo-elements)
|
[Plugin documentation](https://github.com/axa-ch/postcss-pseudoelements)

## `overflow-wrap` property (`word-wrap` fallback)

Converts `overflow-wrap` to `word-wrap` (many browser support only the old [word-wrap](http://caniuse.com/#feat=wordwrap) property).

```css
body {
  overflow-wrap: break-word;
}
```

[Specification](https://drafts.csswg.org/css-text-3/#propdef-word-wrap)
|
[Plugin documentation](https://github.com/MattDiMu/postcss-replace-overflow-wrap)

## attribute case insensitive

Allows you to use case insensitive attributes.

```css
[frame=hsides i] {
  border-style: solid none;
}
```

[Specification](https://www.w3.org/TR/selectors4/#attribute-case)
|
[Plugin documentation](https://github.com/Semigradsky/postcss-attribute-case-insensitive)

## @todo

Any omissions of the CSS specifications (even in draft) that are subject to be
handled by cssnext are not intentional.
You can take a look at the [list of features that are waiting to be implemented](https://github.com/MoOx/postcss-cssnext/issues?q=is%3Aopen+is%3Aissue+label%3A%22type%3A+feature+request%22).
Feel free to work on a feature ready to be added, or
[open a new issue](https://github.com/MoOx/postcss-cssnext/issues/new)
if you find something that should be handled.
Keep in mind that, as of right now, this project is intended to support new CSS
*syntax* only.
