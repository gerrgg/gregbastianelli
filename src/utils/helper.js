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
  const firstHeading = headings[0]

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

      const thisHeadingLevel = getHeadingLevel(heading)
      const nextHeadingLevel = getHeadingLevel(
        headings[String(parseInt(key) + 1)]
      )

      // if next header is migger, create list item and open ul
      if (thisHeadingLevel < nextHeadingLevel) {
        tableOfContentsList += `<li>${link}</li><ul>`
        // if next header is smaller, create list item and close ul
      } else if (thisHeadingLevel > nextHeadingLevel) {
        // after adding the current link, we calculate the range between the current
        // and next heading level (e.g jumping from a h4 to h2 (4 - 2 = 2)) and repeat
        // "</ul>" for the range (close up all the open lists)
        tableOfContentsList += `<li>${link}</li>${"</ul>".repeat(
          thisHeadingLevel - nextHeadingLevel
        )}`
        // Otherwise its just a list item
      } else {
        tableOfContentsList += `<li>${link}</li>`
      }
    }
  }

  // add html to DOM
  tableOfContentsDOM.innerHTML = tableOfContentsList
}

const makeLink = string => `<a href="#${makeSlug(string)}">${string}</a>`

// take a string and slugify it into url friendly slugs
export const makeSlug = string =>
  slugify(string, { remove: /[*+~.()'"!:@;]/g })
    .toLowerCase()
    .replace("_", "-")

// extract heading level from nodename (H1 = 1, H6 = 6)
const getHeadingLevel = heading => (heading ? heading.nodeName.substr(1) : null)

export default { highlightCode, buildTableOfContents }
