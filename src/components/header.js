import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../sass/header.scss"

const Header = ({ siteTitle }) => (
  <header className="header">
    <nav>
      <h1 className="logo">
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
