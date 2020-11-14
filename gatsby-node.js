/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const results = await graphql(`
    {
      allWpPost(sort: { fields: [date] }) {
        nodes {
          title
          excerpt
          content
          slug
        }
      }
      allWpCategory {
        nodes {
          id
          link
        }
      }
    }
  `)

  // make post pages
  results.data.allWpPost.nodes.forEach(node => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: node.slug,
      },
    })
  })

  // make category pages
  results.data.allWpCategory.nodes.forEach(node => {
    createPage({
      path: node.link,
      component: path.resolve(`./src/templates/blog-category.js`),
      context: {
        id: node.id,
      },
    })
  })
}
