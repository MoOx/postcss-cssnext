---
template: Simple
title: cssnext - Use tomorrow's CSS syntax, today.
---
<div class="cssnext-Jumbotron cssnext-Jumbotron--default cssnext-Center cssnext-Light">
  <section class="r-Grid">
    <div class="r-Grid-cell">
      <strong class="cssnext-Jumbotron-title">Use tomorrow's CSS syntax, today.</strong>
      <p>
        <a
          title="github.com/cssnext/cssnext"
          href="https://github.com/cssnext/cssnext"
        >
          Check out cssnext on GitHub
        </a>
        or
        <a href="/playground/">
          try it in your browser
        </a>
      </p>
      <iframe
        frameborder="0" scrolling="0"
        width="145px" height="30px"
        style="vertical-align: middle"
        src="https://ghbtns.com/github-btn.html?user=cssnext&repo=cssnext&type=star&count=true&size=large"
      ></iframe>
    </div>
  </section>
</div>

<section class="r-Grid cssnext-Section">
  <div class="r-Grid-cell r-minM--1of3">
    <h2 class="cssnext-Section-title">What is cssnext?</h2>
    <p class="cssnext-Section-content">
      cssnext is a CSS transpiler that allows you to use
      the latest CSS syntax today.
      It transforms
      <a href="http://www.xanthir.com/b4Ko0">new CSS specs</a>
      into more compatible CSS
      so you don't need to wait for browser support.
      <em class="cssnext-Section-highlight">
        You can literally write future-proof CSS
        and forget old preprocessor specific syntax.
      </em>
    </p>
  </div>
  <div class="r-Grid-cell r-minM--2of3">
  <h2 class="cssnext-Section-title"><a href="/features/">Features</a></h2>
    <ul class="r-Grid cssnext-List cssnext-FeaturesList">
      <li class="r-Grid-cell r-minS--1of2">
        custom properties & `var()`
      </li>
      <li class="r-Grid-cell r-minS--1of2">
        reduced `calc()`
      </li>
      <li class="r-Grid-cell r-minS--1of2">
        custom media queries
      </li>
      <li class="r-Grid-cell r-minS--1of2">
        media queries ranges
      </li>
      <li class="r-Grid-cell r-minS--1of2">
        custom selectors
      </li>
      <li class="r-Grid-cell r-minS--1of2">
        automatic vendor prefixes
      </li>
      <li class="r-Grid-cell r-minS--1of2">
        `color()` support
      </li>
      <li class="r-Grid-cell r-minS--1of2">
        `gray()` support
      </li>
      <li class="r-Grid-cell r-minS--1of2">
        `hwb()` support
      </li>
      <li class="r-Grid-cell r-minS--1of2">
        hexa `#rrggbbaa` support
      </li>
      <li class="r-Grid-cell r-minS--1of2">
        `rebeccapurple`
      </li>
      <li class="r-Grid-cell r-minS--1of2">
        `:matches` pseudo-class
      </li>
      <li class="r-Grid-cell r-minS--1of2">
        `:not` pseudo-class
        <small class="cssnext-FeaturesList-small">
          (to l.3)
        </small>
      </li>
      <li class="r-Grid-cell r-minS--1of2">
        font-variant
        <small class="cssnext-FeaturesList-small">
          (to font-feature-settings)
        </small>
      </li>
      <li class="r-Grid-cell r-minS--1of2">
        filters
        <small class="cssnext-FeaturesList-small">
          (svg fallback)
        </small>
      </li>
      <li class="r-Grid-cell r-minS--1of2">
        `rem` units fallback
        <small class="cssnext-FeaturesList-small">
          (to px)
        </small>
      </li>
      <li class="r-Grid-cell r-minS--1of2">
        ::pseudo syntax
        <small class="cssnext-FeaturesList-small">
          (`:` compat)
        </small>
      </li>
    </ul>
    <small
      class="cssnext-FeaturesList-small"
      style="display: block; text-align: center;"
    >
      <small>
        _l.* are level of the specification (when information is relevant)_
      </small>
    </small>
  </div>
</section>

<section class="cssnext-Jumbotron cssnext-Jumbotron--whiteRoad">
  <div class="r-Grid cssnext-Center">
    <div class="r-Grid-cell r-minM--1of2 cssnext-Section">
      <h2 class="cssnext-Section-title">Why cssnext?</h2>
      <p class="cssnext-Section-content" style="text-align: left">
        Prior to 2015, CSS was frustrating by not having any specification for features we were looking for.
        No variables, no math, no color manipulation & no customization.
        Things are going to change soon since a lot of work has been made by the W3C to write new specs to make our life easier.
        With cssnext, you can start using some new features today!
      </p>
    </div>
  </div>
</section>

<section class="cssnext-Jumbotron cssnext-Jumbotron--darkDeloreanFront cssnext-Light">
  <div class="r-Grid">
    <div class="r-Grid-cell r-minM--1of2 cssnext-Section">
      <h3 class="cssnext-Section-title">Future-proof code</h3>
      <p class="cssnext-Section-content">
        In a near future, browsers will implement new CSS specifications. As time passes, cssnext will remove some transformations that won't be necessary anymore.
        And maybe one day, you will be able to completely remove cssnext from your workflow without touching your CSS.
      </p>
    </div>
  </div>
</section>

<section class="cssnext-Jumbotron cssnext-Jumbotron--lightFast">
  <div class="r-Grid">
    <div class="r-Grid-cell r-minM--1of2"></div>
    <div class="r-Grid-cell r-minM--1of2 cssnext-Section">
      <h3 class="cssnext-Section-title">It's fast. Lightning fast.</h3>
      <p class="cssnext-Section-content">
        cssnext uses <a href="https://github.com/postcss/postcss">PostCSS</a>
        which has
        <a href="https://github.com/postcss/benchmark">a way faster CSS parser</a>.
        <br />
        It's a good competitor to libsass, a bit faster than LESS and Stylecow,
        and way faster than Myth or original Ruby Sass.
      </p>
    </div>
  </div>
</section>

<section class="cssnext-Jumbotron cssnext-Jumbotron--darkFlux cssnext-Light">
  <div class="r-Grid">
    <div class="r-Grid-cell r-minM--1of2 cssnext-Section">
      <h3 class="cssnext-Section-title">Active development</h3>
      <p class="cssnext-Section-content">
        No longer wait for releases.
        A fixed bug will be released ASAP.
        <br />
        Minor features will never be idle for long.
        <br />
        See that by yourself on
        <a href="https://github.com/cssnext/cssnext/graphs/contributors">cssnext</a>
        &amp;
        <a href="https://github.com/postcss/postcss/graphs/contributors">PostCSS</a>.
        activities graphs.
        <br />
        cssnext uses lots of PostCSS plugins,
        <a href="https://github.com/postcss/">so check them out too.</a>
      </p>
    </div>
  </div>
</section>

<section class="cssnext-Jumbotron cssnext-Jumbotron--lightTeam">
  <div class="r-Grid">
    <div class="r-Grid-cell r-minM--1of2"></div>
    <div class="r-Grid-cell r-minM--1of2 cssnext-Section">
      <h3 class="cssnext-Section-title">Based on NPM ecosystem</h3>
      <p class="cssnext-Section-content">
        cssnext uses <a href="https://www.npmjs.org/">npm packages</a> that should respect <a href="http://semver.org/">semver</a>.
        <br />
        Bugfixes are pushed often.
        Minor changes won't break your code.
        Major releases are, well, major and are not supposed to happen a lot.
        <br />
        Codebase is exploded into smart and standalone packages so it's easier to work on something or fix a bug.
      </p>
    </div>
  </div>
</section>

<div class="cssnext-Jumbotron cssnext-Jumbotron--default cssnext-Center cssnext-Light">
  <section class="r-Grid">
    <div class="r-Grid-cell">
      <div class="cssnext-Jumbotron-title">
        <a href="/playground/">Try cssnext in your browser now.</a>
      </div>
    </div>
  </section>
</div>

<section class="cssnext-Jumbotron cssnext-Center">
  <div class="r-Grid">
    <div class="r-Grid-cell">
      Follow
      <a href="https://twitter.com/cssnext">@cssnext</a>
      to get the latest news
      or
      <a href="https://gitter.im/cssnext/cssnext">join the chat on gitter</a>
      if you have any questions.
    </div>
  </div>
</section>

<div class="cssnext-Jumbotron cssnext-Jumbotron--cssrecipes cssnext-Center cssnext-Light">
  <section class="r-Grid">
    <div class="r-Grid-cell">
      <div class="cssnext-Jumbotron-title cssnext-Jumbotron-title--smaller">
        <a href="https://cssrecipes.github.io/">Check out cssrecipes, components working with cssnext</a>
      </div>
      <small>
        You can also check
        <a href="https://suitcss.github.io/">suitcss</a>
        or
        <a href="http://www.basscss.com/">basscss</a>
        </small>
    </div>
  </section>
</div>
