import React from "react"
import { Link } from "gatsby"
import gregLogo from "../images/greg-logo-cyan-black.png"

const Logo = ({ siteTitle }) => (
  <h1 className="logo">
    <Link to="/">
      <img src={gregLogo} alt={siteTitle} />
    </Link>
  </h1>
)

export default Logo
