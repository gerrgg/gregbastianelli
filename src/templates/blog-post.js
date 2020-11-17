import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"

export default function BlogPost({ data }) {
  const post = data.allWpPost.nodes[0]

  const featuredImage = post.featuredImage
    ? post.featuredImage.node.mediaItemUrl
    : null

  const category = post.categories ? post.categories.nodes[0] : null

  return (
    <Layout>
      <div id="single">
        <BlogPostCategory category={category} />
        <h1 className="title section-header">{post.title}</h1>
        <img src={featuredImage} />
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
          }
        }
      }
    }
  }
`
