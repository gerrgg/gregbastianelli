import React, { useState } from "react"
import { Link } from "gatsby"

const Menu = ({ menu, show }) => (
  <ul className={`menu ${show ? "show-mobile" : ""}`}>
    {menu.map(menuItem => {
      const children = menuItem.childItems.nodes.length
        ? menuItem.childItems.nodes
        : null

      return children ? (
        <DropdownMenuItem
          key={menuItem.id}
          parent={menuItem}
          children={children}
        />
      ) : (
        <MenuItem key={menuItem.id} menuItem={menuItem} />
      )
    })}
  </ul>
)

const MenuItem = ({ menuItem }) => (
  <li className="menu-item">
    <a href={menuItem.path}>{menuItem.label}</a>
  </li>
)

const DropdownMenuItem = ({ parent, children }) => {
  const [show, setShow] = useState(false)

  return (
    <button
      className={`btn dropdown menu-item`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {parent.label}
      <div className={`wrapper`}>
        <div className={`inner flex-square ${show ? "show" : ""}`}>
          <div className="arrow-top"></div>
          {children.map(child => (
            <Link key={child.id} className="button-link" to={child.path}>
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </button>
  )
}

export default Menu
