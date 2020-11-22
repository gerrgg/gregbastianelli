import PropTypes from "prop-types"
import React from "react"
import Logo from "./logo"
import Menu from "./menu"
import "../sass/header.scss"

const Header = ({ siteTitle, menuItems }) => {
  // filter only parents
  const menu = menuItems
    ? menuItems.filter(menuItem => menuItem.parentId === null)
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

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
