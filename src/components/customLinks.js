import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faCode } from "@fortawesome/free-solid-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const CustomLinks = ({ show, setShow }) => (
  <div id="custom-links" className="flex center">
    <CustomLink
      link="https://github.com/gerrgg"
      icon={faGithub}
      text="Github"
    />
    <CustomLink
      link="https://github.com/gerrgg/gregbastianelli"
      icon={faCode}
      text="Source"
    />
    <button className="btn mobile-menu" onClick={() => setShow(!show)}>
      <FontAwesomeIcon icon={faBars} />
      <span>Menu</span>
    </button>
  </div>
)

const CustomLink = ({ link, icon, text }) => (
  <a
    href={link}
    rel="noopener"
    target="
  blank"
  >
    <FontAwesomeIcon icon={icon} />
    <span>{text}</span>
  </a>
)

export default CustomLinks
