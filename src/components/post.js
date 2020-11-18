import React, { useEffect } from "react"
import { Link } from "gatsby"

const Post = ({ post, className }) => {
  const src = post.featuredImage ? post.featuredImage.node.mediaItemUrl : null

  return (
    <div className={`post ${className ? className : ""}`}>
      <Link to={`/${post.slug}`}>
        <div>
          <h2>{post.title}</h2>
          <PostExcerpt excerpt={post.excerpt} />
          <span>Read more</span>
        </div>
        <PostImage src={src} />
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

const PostImage = ({ src }) => <img src={src} />

export default Post
