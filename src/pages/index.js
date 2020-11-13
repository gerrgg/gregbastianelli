import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../sass/index.scss"

export default function Home({ data }) {
  // data is the result of the query
  return (
    <Layout>
      <SEO title="Home" />
      <div id="home">
        <h4>Recently Published</h4>
        {data.allWpPost.nodes.map(node => (
          <Post node={node} />
        ))}
      </div>
    </Layout>
  )
}

const Post = ({ node }) => {
  return (
    <div className="post">
      <Link to={node.slug}>
        <h2>{node.title}</h2>
        <PostExcerpt excerpt={node.excerpt} />
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

// graphql query
export const pageQuery = graphql`
  query {
    allWpPost(sort: { fields: [date], order: DESC }) {
      nodes {
        title
        excerpt
        slug
      }
    }
  }
`
