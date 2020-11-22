import React from "react"
import { Link } from "gatsby"

const Post = ({ post, className }) => {
  const featuredImage = post.featuredImage ? post.featuredImage.node : null

  return (
    <div className={`post ${className ? className : ""}`}>
      <Link to={`/${post.slug}`}>
        <div>
          <h2>{post.title}</h2>
          <PostExcerpt excerpt={post.excerpt} />
          <span className="read-more">Read more</span>
        </div>
        {featuredImage ? (
          <img src={featuredImage.mediaItemUrl} alt={featuredImage.altText} />
        ) : null}
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
