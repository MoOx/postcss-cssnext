const toc = document.querySelector(".markdownIt-TOC");
const tocOriginalContainer = document.querySelector(
  ".js-markdownIt-TOCOriginalContainer"
);
const tocPlaceholder = document.querySelector(".js-markdownIt-TOCPlaceholder");
if (toc && tocOriginalContainer && tocPlaceholder) {
  tocOriginalContainer.classList.add("r-minM--4of5");
  tocPlaceholder.classList.add("r-minM--1of5");
  tocPlaceholder.appendChild(toc);
} else {
  console.info("No TOC to move");
}
