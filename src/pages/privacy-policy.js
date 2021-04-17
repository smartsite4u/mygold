import React from "react"
import { Link } from "gatsby"

// import Layout from "../components/layout"
import LayoutNoScroll from "../components/layout-no-scroll"
import SEO from "../components/seo"

import H3Underlined from "../components/elements/h3-underlined"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const PrivacyPolicyPage = () => (
  <LayoutNoScroll>
    <SEO title="Privacy Policy" />
    <Container fluid className="bg-slate sub-page-padding">
      <Container>
        <Row>
          <Col>
            <H3Underlined
              h3Text={"Privacy Policy"}
            ></H3Underlined>
          </Col>
        </Row>
      </Container>
    </Container>
  </LayoutNoScroll>
)

export default PrivacyPolicyPage
