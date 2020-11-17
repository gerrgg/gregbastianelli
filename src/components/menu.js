import React, { useState } from "react"
import { Link } from "gatsby"

const Menu = ({ menu }) => (
  <ul className="menu">
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
    <li
      className={`dropdown menu-item`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {parent.label}
      <div className={`wrapper ${show ? "show" : ""}`}>
        <div className="flex-square">
          {children.map(child => (
            <Link key={child.id} className="button-link" to={child.path}>
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </li>
  )
}

export default Menu
