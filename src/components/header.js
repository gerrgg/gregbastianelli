import { Link, graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Menu from "./menu"
import "../sass/header.scss"

const Header = ({ siteTitle }) => {
  const data = useStaticQuery(
    graphql`
      {
        wpMenu {
          id
          menuItems {
            nodes {
              parentId
              label
              path
              childItems {
                nodes {
                  path
                  label
                }
              }
            }
          }
        }
      }
    `
  )

  // filter only parents
  const menu = data.wpMenu.menuItems.nodes
    ? data.wpMenu.menuItems.nodes.filter(menuItem => menuItem.parentId === null)
    : null

  return (
    <header className="header">
      <div className="container">
        <Logo siteTitle={siteTitle} />
        <nav>
          <Menu menu={menu} />
        </nav>
      </div>
    </header>
  )
}

const Logo = ({ siteTitle }) => {
  const string = siteTitle.split(" ")
  return (
    <h1 className="logo">
      <Link to="/">
        <span className="color-main">{string[0]}</span>{" "}
        <span className="color-secondary">{string[1]}</span>
      </Link>
    </h1>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
