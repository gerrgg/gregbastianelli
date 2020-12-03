import React from "react"
import Boop from "./boop"
import { Link } from "gatsby"
import gregLogo from "../images/greg-logo-cyan-black.png"

const Logo = ({ siteTitle }) => (
  <Boop rotation={-10} scale={1.1}>
    <h1 className="logo">
      <Link to="/">
        <img src={gregLogo} alt={siteTitle} />
      </Link>
    </h1>
  </Boop>
)

export default Logo
