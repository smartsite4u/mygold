import React from "react"
import { Link } from "gatsby"

/* BS4 */
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import logoLong from '../../images/logo-mygold-long-min.png'
import austracLogo from '../../images/ag-austrac.png'



// start component
const Footer = ({ props }) => {
  return (
    <footer className="w-100 bg-slate">
      <Container>
        {/* Logo link row */}
        <Row className="mb-4">

          {/* Social media links */}
          <Col lg="3" className="d-flex justify-content-center">
            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <a
                href="https://www.facebook.com/ozz.metals"
                className="font-white hover-white mx-4"
              >
                <i className="fab fa-lg fa-facebook-f"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/my-gold-11-11-token"
                className="font-white hover-white mx-4"
              >
                <i className="fab fa-lg fa-linkedin"></i>
              </a>
            </div>
          </Col>

          {/* Logo */}
          <Col lg="6" className="d-flex justify-content-center align-items-center mb-4 mb-lg-0">
            <div>
              <Link to="/">
                <img className="img-fluid" src={logoLong} style={{ maxWidth: 265 }} />
              </Link>
            </div>
          </Col>

          {/* Austrac logo */}
          <Col lg="3" className="d-flex justify-content-center align-items-center">
            <div>
              <img className="img-fluid" src={austracLogo} style={{ maxWidth: 152 }} />
            </div>
          </Col>
        </Row>


        {/* Bottom links row */}
        <Row>
          <Col lg="12" className="d-flex justify-content-center align-items-center">
            <Link to="/contact-us" className="mx-2 hover-white">Contact Us</Link>
            <Link to="/privacy-policy" className="mx-2 hover-white">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="mx-2 hover-white">Terms & Conditions</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer