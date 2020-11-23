import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"
import slugify from "slugify"

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

// grab all the headings in a post and build a table of contents
const buildTableOfContents = () => {
  // get all headings from #content
  const headings = document
    .getElementById("content")
    .querySelectorAll("h2, h3, h4, h5, h6")

  // get the element we are going to fill with html
  const tableOfContentsDOM = document
    .getElementById("table-of-contents")
    .querySelector("ul")

  // this will hold our html until its ready to be set
  let tableOfContentsList = ""

  // loop through the headings
  for (let key in headings) {
    // filter objects
    if (typeof headings[key] === "object") {
      // get current heading
      const heading = headings[key]

      // get next heading
      const nextHeading = headings[String(parseInt(key) + 1)]

      // make slug from current heading
      const slug = makeSlug(heading.textContent)

      // create a link to the header
      const link = `<a href="#${slug}">${heading.textContent}</a>`

      // assign the slug used in the link as the headers id
      heading.id = slug

      // if next header is bigger, create a list item
      if (getHeadingLevel(heading) < getHeadingLevel(nextHeading)) {
        tableOfContentsList += `<li>${link}</li>`
        // if next header is smaller, create a nested list and add link
      } else if (getHeadingLevel(heading) > getHeadingLevel(nextHeading)) {
        tableOfContentsList += `<ul><li>${link}</li>`
        // otherwise close the list and add current link
      } else {
        tableOfContentsList += `</ul><li>${link}</li>`
      }
    }
  }

  // add html to DOM
  tableOfContentsDOM.innerHTML = tableOfContentsList
}

// take a string and slugify it into url friendly slugs
export const makeSlug = string =>
  slugify(string, { remove: /[*+~.()'"!:@;]/g })
    .toLowerCase()
    .replace("_", "-")

// extract heading level from nodename (H1 = 1, H6 = 6)
const getHeadingLevel = heading => (heading ? heading.nodeName.substr(1) : null)

export default { highlightCode, buildTableOfContents }
