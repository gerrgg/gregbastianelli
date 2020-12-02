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
      <div class="container">
        <div className="flex between">
          <span>
            <Logo siteTitle={siteTitle} />
            <CopyRight />
          </span>
          <Menu menu={menu} />
        </div>
      </div>
      <script
        src="https://kit.fontawesome.com/dd960d1f1a.js"
        crossorigin="anonymous"
      ></script>
    </footer>
  )
}

const CopyRight = () => (
  <span className="copyright">
    ©{new Date().getFullYear()}-present
    {` `}
    Greg Bastianelli. All Rights Reserved.
  </span>
)

export default Footer
