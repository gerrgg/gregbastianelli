import cookie from "./cookie"
import api from "../utils/api"
import highlighter from "../utils/highlighter"
import tableOfContents from "../utils/tableOfContents"

/**
 * Add syntax highlighting to code blocks wrapped in pre tags
 */
const highlightCode = () => {
  const codes = document.querySelectorAll("pre > code")
  highlighter.highlight(codes)
}

// grab all the headings in a post and build a table of contents
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

const getPostClicks = async postID => {
  // Get the users clicked posts from cookie
  const clickedPosts = cookie.get("clickedPosts")
    ? JSON.parse(cookie.get("clickedPosts"))
    : 0

  // if clickedPosts doesnt include this post ID - set at 0
  return !clickedPosts[`${postID}`] ? 0 : clickedPosts[`${postID}`]
}

const getPostHearts = async postID => {
  const post = await api.getPost(postID)
  return post.meta.hearts
}

export default {
  highlightCode,
  buildTableOfContents,
  getPostClicks,
  getPostHearts,
}
