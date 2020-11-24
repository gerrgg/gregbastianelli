import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Post from "../components/post"

export default function BlogCategory({ data }) {
  console.log(data)

  // sorted by post length
  const categories = data.allWpCategory
    ? data.allWpCategory.nodes.sort((a, b) => {
        return a.posts.nodes.length < b.posts.nodes.length
      })
    : null

  return (
    <Layout>
      <SEO title="Tutorials | How to | Coding" />
      <div id="archive">
        {categories.map(category => (
          <Category key={category.key} category={category} />
        ))}
      </div>
    </Layout>
  )
}

const Category = ({ category }) => {
  const posts = category.posts.nodes

  if (!posts.length) {
    return null
  }

  return (
    <div>
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
  )
}

export const query = graphql`
  query {
    allWpCategory {
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
