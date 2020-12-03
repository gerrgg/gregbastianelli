import React from "react"
import Boop from "../components/boop"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"

const Post = ({ post, className }) => {
  const featuredImage = post.featuredImage ? post.featuredImage.node : null

  return (
    <Boop scale={1.1} springConfig={{ tension: 150, friction: 40 }}>
      <div className={`post ${className ? className : ""}`}>
        <Link to={`/${post.slug}`}>
          <div className="words">
            <h2>{post.title}</h2>
            <PostExcerpt excerpt={post.excerpt} />
            <ReadMore />
          </div>
          {featuredImage ? (
            <img src={featuredImage.mediaItemUrl} alt={featuredImage.altText} />
          ) : null}
        </Link>
      </div>
    </Boop>
  )
}

const ReadMore = () => (
  <span className="read-more flex align-center">
    <Boop x={20} timing={300}>
      <span style={{ paddingRight: 5 }}>Read More</span>
      <FontAwesomeIcon
        icon={faChevronRight}
        style={{ height: 14, width: 16 }}
      />
    </Boop>
  </span>
)

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
