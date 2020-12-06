import React, { useState, useEffect } from "react"
import { animated } from "react-spring"
import useBoop from "../hooks/useBoop"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import cookie from "../utils/cookie"
import api from "../utils/api"

const HeartButton = ({ postID }) => {
  const heartedPosts = cookie.get("hearted_posts")
    ? JSON.parse(cookie.get("hearted_posts"))
    : 1

  const initClicks = !heartedPosts[`${postID}`] ? 0 : heartedPosts[`${postID}`]

  const [hearts, setHearts] = useState(0)

  const [clicks, setClicks] = useState(initClicks)

  const [opacity, setOpacity] = useState(0.5)

  const [clickStyle, clickTrigger] = useBoop({ y: -1, scale: 1.25 })

  useEffect(() => {
    async function getData() {
      const { meta } = await api.getPost(postID)
      setHearts(meta.hearts)
    }
    getData()
  }, [postID])

  const handleClick = () => {
    if (clicks > 9) return

    // run click animation
    clickTrigger()

    // setup update object
    const update = { meta: { hearts: hearts + 1 } }

    // update remote server
    api.updatePost(postID, update)

    // increment clicks
    setClicks(clicks + 1)

    heartedPosts[`${postID}`] = clicks

    // set/update cookie
    cookie.set("hearted_posts", JSON.stringify(heartedPosts))

    // set opacity for heart
    setOpacity(0.5 + clicks * 0.05)

    // update heart counter
    setHearts(update.meta.hearts)

    console.log(heartedPosts)
  }

  return (
    <button className="btn heart-button" onClick={() => handleClick()}>
      <animated.span style={clickStyle} className="wrapper">
        <FontAwesomeIcon
          icon={faHeart}
          style={{ opacity: opacity, height: 32, width: 32 }}
        />
        <span className="text">{hearts}</span>
      </animated.span>
    </button>
  )
}

export default HeartButton
