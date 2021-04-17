import React from "react"
// import { Link } from "gatsby"

import LayoutNoScroll from "../components/layout-no-scroll"
import SEO from "../components/seo"

import H3Underlined from "../components/elements/h3-underlined"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ShortBanner from '../components/banners/short-banner'
import solutionHero from '../images/backgrounds/img-solution-dark-min.jpg'


const ContactUsPage = () => (
  <LayoutNoScroll>
    <SEO title="Transaction Failed" />

    {/* Hero splash row */}
    <ShortBanner
      bgImage={solutionHero}
    >
      <h1 className="text-gold font-secondary fw-700">The transaction has been canceled.</h1>
    </ShortBanner>

    <Container fluid className="bg-dark-slate sub-page-padding" style={{"min-height": "40.8vh;"}}>
      <Container>
        <Row>
          <Col md="6" lg="8" className="col-12 mx-auto">
          </Col>
        </Row>
      </Container>
    </Container>
  </LayoutNoScroll>
)

export default ContactUsPage
