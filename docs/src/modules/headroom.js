import onAnimationFrame from "./onAnimationFrame"

const headroom = document.querySelector(".js-Headroom")
if (headroom) {
  const step = headroom.getBoundingClientRect().height

  const getScrollTop = () => window.pageYOffset ||
    document.documentElement.scrollTop

  let previousScroll = getScrollTop()

  const update = () => {
    const scroll = getScrollTop()
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

  window.addEventListener(
    "scroll",
    () => onAnimationFrame(update),
    false
  )

  // force hide when url hash is updated
  window.addEventListener(
    "hashchange",
    () => headroom.classList.add("js-Headroom--hide"),
    false
  )
}
