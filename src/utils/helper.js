import highlighter from "../utils/highlighter"
import tableOfContents from "../utils/tableOfContents"

/**
 * Add syntax highlighting to code blocks wrapped in pre tags
 */
const highlightCode = () => {
  const codes = document.querySelectorAll("pre > code")
  highlighter.highlight(codes)
}

/**
 * Build a table of contents by passing in targets (the headings you want to link)
 * and the wrapper (the DOM) whose innerHTML will be altered.
 */
const buildTableOfContents = () => {
  // get all headings from #content
  const target = document
    .getElementById("content")
    .querySelectorAll("h2, h3, h4, h5, h6")

  // get the element we are going to fill with html
  const wrapper = document
    .getElementById("table-of-contents")
    .querySelector("ul")

  tableOfContents.build(target, wrapper)
}

export default {
  highlightCode,
  buildTableOfContents,
}
