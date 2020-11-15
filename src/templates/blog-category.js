import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Post from "../components/post"

export default function BlogPost({ data }) {
  const category = data.allWpCategory.nodes[0]
  const posts = category.posts.nodes

  return (
    <Layout>
      <div>
        <h1>{category.name}</h1>
        <div id="archive">
          {posts.map(post => (
            <Post post={post} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    allWpCategory(filter: { id: { eq: $id } }) {
      nodes {
        id
        name
        posts {
          nodes {
            slug
            title
            excerpt
          }
        }
      }
    }
  }
`
