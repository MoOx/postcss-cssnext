# 2.1.0 - 2015-09-16

- Added: [postcss-initial](https://github.com/maximkoretskiy/postcss-initial)
([#12](https://github.com/cssnext/postcss-cssnext/issues/12)).  
Supports `initial` value for  all properties. Also it supports `all: initial`.
_Does not support `all: unset` and `all: inherit`._  
Plugin can be useful for creating isolated components.  
  - `all` specification: https://drafts.csswg.org/css-cascade/#all-shorthand
  - `all` browsers support: http://caniuse.com/#feat=css-all
  - `initial` value specification: https://drafts.csswg.org/css-cascade/#initial-value
  - `initial` value browser support: http://caniuse.com/#feat=css-initial-value

# 2.0.1 - 2015-09-14

- Fixed: plugin can be consumed correctly from es5 environment
([#11](https://github.com/cssnext/postcss-cssnext/issues/11))

# 2.0.0 - 2015-09-14

- Added: support for PostCSS v5.x
- Removed: support for PostCSS v4.x

---

For pre 2.0.0 information, please visit [cssnext CHANGELOG](https://github.com/cssnext/cssnext/blob/master/CHANGELOG.md)
