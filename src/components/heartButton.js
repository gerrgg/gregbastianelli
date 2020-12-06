import React, { useState, useEffect } from "react"
import { animated } from "react-spring"
import useBoop from "../hooks/useBoop"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import api from "../utils/api"

const HeartButton = ({ postID }) => {
  const [hearts, setHearts] = useState(0)
  const [clicks, setClicks] = useState(0)

  const [style, trigger] = useBoop({ scale: 1.5 })

  useEffect(() => {
    async function getData() {
      const { meta } = await api.getPost(postID)
      setHearts(meta.hearts)
    }
    getData()
  }, [postID])

  const handleClick = () => {
    trigger()
    const update = { meta: { hearts: hearts + 1 } }

    api.updatePost(postID, update)

    if (clicks < 9) {
      setClicks(clicks + 1)
      setHearts(update.meta.hearts)
    }
  }

  return (
    <button className="btn heart-button" onClick={() => handleClick()}>
      <animated.span style={style}>
        <FontAwesomeIcon icon={faHeart} style={{ height: 32, width: 32 }} />
        <span className="text">{hearts}</span>
      </animated.span>
    </button>
  )
}

export default HeartButton
