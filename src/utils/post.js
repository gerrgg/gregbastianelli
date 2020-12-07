import cookie from "./cookie"
import api from "../utils/api"

/**
 * Check for cookie "clickedPosts" and return or default to 0
 * @param {Integer} postID
 */
const getClicks = async postID => {
  // Get the users clicked posts from cookie
  const clickedPosts = cookie.get("clickedPosts")
    ? JSON.parse(cookie.get("clickedPosts"))
    : 0

  // if clickedPosts doesnt include this post ID - set at 0
  return !clickedPosts[`${postID}`] ? 0 : clickedPosts[`${postID}`]
}

/**
 * Get a post's heart metadata
 * @param {Integer} postID
 */
const getHearts = async postID => {
  const post = await api.getPost(postID)
  return post.meta.hearts
}

export default { getClicks, getHearts }
