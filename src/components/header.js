import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../sass/header.scss"

const Header = ({ siteTitle }) => (
  <header className="header">
    <div className="container">
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
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
