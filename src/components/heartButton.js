import React, { useState, useEffect } from "react"
import { animated } from "react-spring"
import useBoop from "../hooks/useBoop"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import cookie from "../utils/cookie"
import api from "../utils/api"
import post from "../utils/post"

const HeartButton = ({ postID }) => {
  const [hearts, setHearts] = useState(0)

  const [clicks, setClicks] = useState(0)

  const [opacity, setOpacity] = useState(0.5)

  const [clickStyle, clickTrigger] = useBoop({ y: -1, scale: 1.25 })

  useEffect(() => {
    /**
     * Get a posts hearts from API and check for clicks cookie which is used to
     * limit clicks a person can give
     */
    async function fetchClicks() {
      // get clicks from cookie or default to 0
      const initClicks = await post.getClicks(postID)
      setClicks(initClicks)

      // init opacity at 50%, add another 5% for every click
      setOpacity(0.5 + 0.05 * initClicks)
    }

    async function fetchHearts() {
      // gets hearts from api or defaults to 0
      const initHearts = await post.getHearts(postID)
      setHearts(initHearts)
    }

    fetchHearts()
    fetchClicks()
  }, [postID])

  /**
   * If click limit is not reached increment post meta hearts and update
   * state. Update click count and clicks cookie.
   */
  const handleClick = () => {
    // trigger animation
    clickTrigger()

    // check click limit
    if (clicks > 9) return

    setClicks(clicks + 1)

    // update hearts
    const update = { meta: { hearts: hearts + 1 } }

    // make POST request to remote server
    api.updatePost(postID, update)

    // check for cookie - return object
    const clickedPosts = !cookie.get("clickedPosts")
      ? {}
      : JSON.parse(cookie.get("clickedPosts"))

    // update cookie object
    clickedPosts[postID] = clicks + 1

    // set new cookie
    cookie.set("clickedPosts", JSON.stringify(clickedPosts))

    // update opacicty
    setOpacity(opacity + 0.05)

    // update hearts counter
    setHearts(update.meta.hearts)
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
