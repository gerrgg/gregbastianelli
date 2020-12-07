import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Boop from "../components/boop"
import HeartButton from "../components/heartButton"
import { faBookOpen } from "@fortawesome/free-solid-svg-icons"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

const TableOfContents = ({ postID }) => {
  const [show, setShow] = useState(false)

  const icon = !show ? faBookOpen : faTimes

  const style = !show
    ? {}
    : { height: 500, width: window.innerWidth - 20, top: 0 }

  return (
    <div id="table-of-contents" style={style}>
      <HeartButton postID={postID} />
      <h4 className="section-header flex between align-center">
        <span>Table of Contents</span>
        <Boop scale={1.1}>
          <button className="btn close" onClick={() => setShow(!show)}>
            <FontAwesomeIcon icon={icon} />
          </button>
        </Boop>
      </h4>
      <ul></ul>
    </div>
  )
}

export default TableOfContents
