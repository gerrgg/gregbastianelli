import PropTypes from "prop-types"
import React, { useState } from "react"
import Logo from "./logo"
import Menu from "./menu"
import CustomLinks from "./customLinks"
import "../sass/header.scss"

const Header = ({ siteTitle, menuItems }) => {
  // filter only parents
  const menu = menuItems
    ? menuItems.filter(menuItem => menuItem.parentId === null)
    : null

  // add state for show/hide menu
  const [show, setShow] = useState(false)

  console.log(show)

  return (
    <header className="header">
      <div className="container">
        <nav className="flex between align-center">
          <div className="flex">
            <Logo siteTitle={"Greg Bastianelli"} />
            <Menu menu={menu} show={show} />
          </div>
          <CustomLinks show={show} setShow={setShow} />
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
