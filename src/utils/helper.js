import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"

hljs.configure({
  languages: ["php", "javascript", "json", "bash", "scss"],
})

const highlightCode = () => {
  const codes = document.querySelectorAll("pre > code")
  for (let key in codes) {
    if (typeof codes[key] === "object") {
      hljs.highlightBlock(codes[key])
    }
  }
}

const buildTableOfContents = () => {
  // if c < n { ul > li}
  // if c === n { > li }
  // if c > n { </ul> >  li }

  // get all headings
  const headings = document
    .getElementById("content")
    .querySelectorAll("h2, h3, h4, h5, h6")

  for (let key in headings) {
    if (typeof headings[key] === "object") {
      const heading = headings[key]
      const oldHTML = heading.outerHTML
      const slug = heading.textContent.toLowerCase().split(" ").join("-")

      heading.outerHTML = `<a href="${slug}">${oldHTML}</a>`

      console.log(slug)

      // extract heading number from nodename h1 = 1
      const currentLevel = heading.nodeName.substr(1)
    }
  }
}

export default { highlightCode, buildTableOfContents }
