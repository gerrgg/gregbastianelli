/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Footer from "./footer"
import "../sass/style.scss"
import Header from "./header"

console.log(process.env.GATSBY_JWT)

const Layout = ({ children }) => {
  const data = useStaticQuery(
    graphql`
      {
        wpMenu {
          id
          menuItems {
            nodes {
              id
              parentId
              label
              path
              childItems {
                nodes {
                  id
                  path
                  label
                }
              }
            }
          }
        }
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  const menuItems = data.wpMenu.menuItems.nodes
    ? data.wpMenu.menuItems.nodes
    : null

  const siteTitle = data.site.siteMetadata.title
    ? data.site.siteMetadata.title
    : "Title"

  return (
    <>
      <Header siteTitle={siteTitle} menuItems={menuItems} />
      <div className="container">
        <main>{children}</main>
      </div>
      <Footer siteTitle={siteTitle} menuItems={menuItems} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
