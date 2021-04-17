import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"


// import useSiteMetadata from '../hooks/use-site-metadata';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import logoLong from '../images/logo-mygold-long-min.png'

import scrollTo from 'gatsby-plugin-smoothscroll';




const Header = ({ location, siteTitle, props }) => {

  const [navToggle, setNavToggle]=useState(0)

  // TODO: 13-1-21 Trying to workout gatsby build window. issue 13-1-21
  // const [purchasePage, setPurchasePage]=useState('');
//   const { siteURL } = useSiteMetadata();
//   console.log("Testing "+siteURL)
  // console.log("Testingzzz " + location) //location is undefined
  // console.log("Testing 2 " + location.pathname)
  // console.log("Testing 3 " + siteURL + location.pathname)


  // No worky on gatsby build (serverless quirks)
  // https://github.com/gatsbyjs/gatsby/issues/8787

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     if (window.location.pathname = "/purchase") {
  //       setPurchasePage(true);
  //     }
  //   }
  // });
  // TODO: 13-1-21 Trying to workout gatsby build window. issue 13-1-21


//   const purchasePage = window.location.pathname

function toggleHamburgerNav() {
    setNavToggle(navToggle  ? "" : "is-active")
}

  return (
    <header
      style={{}}
    >
      <Navbar expand="lg" className="bg-dark-slate">
        <Container>
          <Navbar.Brand href="/">
            <div>
              <img className="img-fluid" src={logoLong} style={{maxWidth: 265, }} />
            </div>
          </Navbar.Brand>

          <Navbar.Toggle
            as="button"
            id="basic-navbar-nav"
            className={"hamburger hamburger--squeeze pr-3 " + navToggle}
            onClick={toggleHamburgerNav}
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars fa-lg font-white"></i>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto d-flex justify-content-start align-items-start align-items-lg-center">
              {/* <Nav.Link
                href="/#introduction"
                className="text-white mr-0 mr-lg-3"
              >Introduction</Nav.Link>

              <Nav.Link
                href="/#solution"
                className="text-white mr-0 mr-lg-3"
              >Solution</Nav.Link>

              <Nav.Link
                href="/#validation"
                className="text-white mr-0 mr-lg-3"
              >Validation</Nav.Link> */}

              {/* <a
                href="/#introduction"
                className="text-white mr-0 mr-lg-3"
              >Introduction</a>

              <a
                href="/#solution"
                className="text-white mr-0 mr-lg-3"
              >Solution</a>

              <a
                href="/#validation"
                className="text-white mr-0 mr-lg-3"
              >Validation</a> */}



              <Link
                to="/purchase"
                className="primary-btn mt-4 mt-lg-0"
                >Buy Now</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


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
