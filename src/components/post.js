import React from "react"
import { Link } from "gatsby"

const Post = ({ post }) => {
  return (
    <div className="post">
      <Link to={`/${post.slug}`}>
        <h2>{post.title}</h2>
        <PostExcerpt excerpt={post.excerpt} />
        <span>Read more</span>
      </Link>
    </div>
  )
}

const PostExcerpt = ({ excerpt }) => {
  return (
    <div
      className="excerpt"
      dangerouslySetInnerHTML={{
        __html: excerpt.replace(/^(.{150}[^\s]*).*/, "$1..."),
      }}
    />
  )
}

export default Post
