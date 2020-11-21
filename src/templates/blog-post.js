import React, { useEffect } from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import helper from "../utils/helper"

export default function BlogPost({ data }) {
  const post = data.allWpPost ? data.allWpPost.nodes[0] : null

  const featuredImage = post.featuredImage ? post.featuredImage.node : null

  const category = post.categories ? post.categories.nodes[0] : null

  useEffect(() => {
    helper.highlightCode()
  })

  return (
    <Layout>
      <div id="single">
        <BlogPostCategory category={category} />

        <h1 className="title section-header">{post.title}</h1>
        {featuredImage ? (
          <img src={featuredImage.mediaItemUrl} alt={featuredImage.altText} />
        ) : null}

        <div
          id="content"
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
      </div>
    </Layout>
  )
}

const BlogPostCategory = ({ category }) => (
  <h6 className="post-category">
    <Link to={category.link}>{category.name}</Link>
  </h6>
)

export const query = graphql`
  query($slug: String!) {
    allWpPost(filter: { slug: { eq: $slug } }) {
      nodes {
        title
        content
        categories {
          nodes {
            name
            link
          }
        }
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
`
