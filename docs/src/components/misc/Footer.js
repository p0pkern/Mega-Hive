import React from "react"
import { FaGithub } from "react-icons/fa"
import { ImLinkedin } from "react-icons/im"

const Footer = () => {
    return (
        <div className="footer">
            <p>Created by Chris Peterman</p>
            <div className="footer-icon">
                <a target="_blank" href="https://github.com/p0pkern" className="github" rel="noreferrer"><FaGithub /></a>
                <a target="_blank" href="https://www.linkedin.com/in/chris-peterman-464005ba/" className="linkedin" rel="noreferrer"><ImLinkedin /></a>
            </div>
        </div>
    )
}

export default Footer