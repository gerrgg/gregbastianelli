import axios from "axios"

const baseUrl = "https://gerrg.com/wp-json/wp/v2"
const token = process.env.GATSBY_JWT

const updatePost = async (postID, update) => {
  const endpoint = `${baseUrl}/posts/${postID}`

  const { data } = await axios.post(endpoint, update, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return data
}

const getPost = async postID => {
  const endpoint = `${baseUrl}/posts/${postID}`

  const { data } = await axios.get(endpoint)

  return data
}

export default { updatePost, getPost }
