import { Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../sass/header.scss"

const Header = ({ siteTitle }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allWpCategory {
          nodes {
            id
            link
            name
          }
        }
      }
    `
  )

  const categories = data.allWpCategory ? data.allWpCategory.nodes : null

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">
          <Link to="/">{siteTitle}</Link>
        </h1>
        <nav>
          <ul>
            {categories.map(category => (
              <li key={category.id}>
                <Link to={category.link}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
