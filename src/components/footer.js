import React from "react"
import Logo from "./logo"
import Menu from "./menu"

const Footer = ({ siteTitle, menuItems }) => {
  // we want no nested items - just links
  const menu = menuItems
    ? menuItems.filter(menuItem => menuItem.parentId !== null)
    : null

  return (
    <footer id="footer">
      <div className="container">
        <div className="wrapper">
          <span>
            <Logo siteTitle={siteTitle} />
            <CopyRight />
          </span>
          <Menu menu={menu} />
        </div>
      </div>
    </footer>
  )
}

const CopyRight = () => (
  <span className="copyright">
    ©1994
    {` `}
    Greg Bastianelli. All Rights Reserved.
  </span>
)

export default Footer
