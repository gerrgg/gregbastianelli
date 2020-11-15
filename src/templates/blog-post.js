import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default function BlogPost({ data }) {
  const post = data.allWpPost.nodes[0]
  const featuredImage = post.featuredImage
    ? post.featuredImage.node.mediaItemUrl
    : null

  return (
    <Layout>
      <div id="single">
        <h1 className="title">{post.title}</h1>
        <img src={featuredImage} />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </Layout>
  )
}

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
