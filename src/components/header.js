import { Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
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
        <h1 className="logo">
          <Link to="/">{siteTitle}</Link>
        </h1>
        <nav>
          <Menu menu={menu} />
        </nav>
      </div>
    </header>
  )
}

const Menu = ({ menu }) => (
  <ul>
    {menu.map(menuItem => {
      const children = menuItem.childItems.nodes.length
        ? menuItem.childItems.nodes
        : null

      return (
        <li>
          <a href={menuItem.path}>{menuItem.label}</a>
          {children ? (
            <ul>
              {children.map(child => (
                <li>{child.label}</li>
              ))}
            </ul>
          ) : null}
        </li>
      )
    })}
  </ul>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
