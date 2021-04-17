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

import ContactForm from '../components/forms/contact-form'


const ContactUsPage = () => (
  <LayoutNoScroll>
    <SEO title="Contact Us" />

    {/* Hero splash row */}
    <ShortBanner
      bgImage={solutionHero}
    >
      <h1 className="text-gold font-secondary fw-700">Any questions?</h1>
      <p className="text-gold mb-0">Get in touch with us now</p>
    </ShortBanner>

    <Container fluid className="bg-dark-slate sub-page-padding">
      <Container>
        <Row>
          <Col md="6" lg="8" className="col-12 mx-auto">

            <div>
              <H3Underlined
                h3Text={"Contact Us"}
              ></H3Underlined>
              <ContactForm></ContactForm>
            </div>

          </Col>
        </Row>
      </Container>
    </Container>
  </LayoutNoScroll>
)

export default ContactUsPage
