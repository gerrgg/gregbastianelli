import hljs from "highlight.js"
import "highlight.js/styles/dracula.css"

hljs.configure({
  languages: ["php", "javascript", "json", "bash", "scss"],
})

const highlight = element => {
  for (let key in element) {
    if (typeof element[key] === "object") {
      hljs.highlightBlock(element[key])
    }
  }
}

export default { highlight }
