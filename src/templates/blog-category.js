import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Post from "../components/post"

export default function BlogCategory({ data }) {
  const category = data.allWpCategory.nodes[0]
  const posts = category.posts.nodes

  return (
    <Layout>
      <div id="archive">
        <header>
          <h1 className="section-header">{category.name}</h1>
          <p className="post-count">{posts.length} Articles</p>
        </header>
        <div className="row">
          {posts.map(post => (
            <Post post={post} className="col-12 col-md-5" />
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
