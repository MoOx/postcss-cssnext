import onAnimationFrame from "./onAnimationFrame"

const headroom = document.querySelector(".js-Headroom")
if (headroom) {
  const step = headroom.getBoundingClientRect().height

  const getScrollTop = () => window.pageYOffset ||
    document.documentElement.scrollTop

  let previousScroll = getScrollTop()

  const update = () => {
    const scroll = getScrollTop()

    // ignore scroll out of the page (hi Safari!)
    if (scroll < 0) {
      return true
    }

    if (scroll > previousScroll + step) {
      headroom.classList.add("js-Headroom--hide")
      previousScroll = scroll
    }
    else if (scroll < previousScroll - step) {
      headroom.classList.remove("js-Headroom--hide")
      previousScroll = scroll
    }
    return true
  }

  // order is kind of important
  // scroll, hashchange & onload

  window.addEventListener(
    "scroll",
    () => onAnimationFrame(update),
    false
  )

  // force hide when url hash is updated
  window.addEventListener(
    "hashchange",
    () => {
      // hashchange can be triggered just after or BEFORE scroll event
      // ... so poor hack
      setTimeout(() => onAnimationFrame(
        () => {
          headroom.classList.add("js-Headroom--hide")
          return true
        }),
        10
      )
    },
    false
  )

  // hide onload if there is a hash (not the top of the page)
  // since page loaded with hash can trigger scroll event...
  // again... poor hack
  setTimeout(() => onAnimationFrame(
    () => {
      if (window.location.hash) {
        // check that the browser is really near the anchor
        // you can scroll up/down & refresh, your browser might keep the scroll
        // so you are not really at the exact place of the anchor
        // and you might be at the top of the page
        // AND WE DONT WANT TO HIDE THE HEADER IN THIS CASE
        const hashElement = document.getElementById(
          window.location.hash.slice(1)
        )
        if (
          hashElement.getBoundingClientRect().top < step &&
          hashElement.getBoundingClientRect().top > -step
        ) {
          headroom.classList.add("js-Headroom--hide")
        }
      }
      return true
    }),
    10
  )
}
