import React from "react"
import { Link } from "gatsby"

const Logo = ({ siteTitle }) => {
  const string = siteTitle.split(" ")
  return (
    <h1 className="logo">
      <Link to="/">
        <span>{string[0]}</span> <span>{string[1]}</span>
      </Link>
    </h1>
  )
}

export default Logo
