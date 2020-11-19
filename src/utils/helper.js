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

export default { highlightCode }
