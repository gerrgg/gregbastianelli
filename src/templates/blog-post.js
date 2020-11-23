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
    helper.buildTableOfContents()
  })

  return (
    <Layout>
      <div class="row">
        <div class="col">
          <TableOfContents />
        </div>
        <div class="col-12 col-md-8">
          <div id="single">
            <BlogPostCategory category={category} />

            <h1 className="title section-header">{post.title}</h1>
            {featuredImage ? (
              <img
                src={featuredImage.mediaItemUrl}
                alt={featuredImage.altText}
              />
            ) : null}

            <div
              id="content"
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

const TableOfContents = () => {
  return (
    <div id="table-of-contents">
      <h4 className="section-header">Table of Contents</h4>
      <ul></ul>
    </div>
  )
}

const BlogPostCategory = ({ category }) => (
  <h4 className="post-category">
    <Link to={category.link}>{category.name}</Link>
  </h4>
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
