import React from "react"
import { graphql, Link } from "gatsby"
import Boop from "../components/boop"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/post"

export default function Home({ data }) {
  // data is the result of the query
  const posts = data.allWpPost.nodes.sort((a, b) => a.date < b.date)
  const categories = data.allWpCategory.nodes

  return (
    <Layout>
      <SEO title="Home" />
      <div id="home">
        <div className="row">
          <PostsColumn posts={posts} />
          <Sidebar categories={categories} posts={posts} />
        </div>
      </div>
    </Layout>
  )
}

const PostsColumn = ({ posts }) => (
  <div className="col-12 col-sm-8">
    <h2 className="title section-header">
      <Emoji emoji="✨" /> <Boop y={-10}>Blog</Boop> <Emoji emoji="✨" />
    </h2>
    {posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
)

const Emoji = ({ emoji }) => (
  <Boop scale={1.2}>
    <span rel="emoji">{emoji}</span>
  </Boop>
)

const Sidebar = ({ categories, posts }) => {
  // reverse list and extract 8 (implement view or clap counter)
  const popularPosts = posts.reverse().slice(0, 8)
  const topCategories = categories.filter(
    category => category.posts.nodes.length
  )

  return (
    <div id="sidebar" className="col-12 col-sm-4">
      <h4 className="section-header">Top Categories</h4>
      <TopCategories categories={topCategories} />
      <h4 className="section-header">Popular Posts</h4>
      <PopularPosts posts={popularPosts} />
    </div>
  )
}

const TopCategories = ({ categories }) => (
  <div id="top-categories">
    {categories.map(category => {
      return (
        <Boop key={category.id} scale={1.2}>
          <Link className="button-link" to={category.link}>
            {category.name}
          </Link>
        </Boop>
      )
    })}
  </div>
)

const PopularPosts = ({ posts }) => {
  return (
    <ul id="popularPosts">
      {posts.map(post => (
        <li key={post.id}>
          <Link to={post.slug}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}

// graphql query
export const pageQuery = graphql`
  query {
    allWpPost(sort: { fields: [date], order: DESC }) {
      nodes {
        id
        title
        excerpt
        slug
        databaseId
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        date
      }
    }
    allWpCategory {
      nodes {
        id
        name
        link
        posts {
          nodes {
            id
          }
        }
      }
    }
  }
`
