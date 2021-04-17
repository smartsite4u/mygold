import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink";
import TransitionLink from 'gatsby-plugin-transition-link'
import Link from 'gatsby-plugin-transition-link'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import scrollTo from 'gatsby-plugin-smoothscroll';

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

import H3Underlined from "../components/elements/h3-underlined"

import IntroCard from "../components/cards/intro-card"
import ValidationInfoCard from "../components/cards/validation-info-card"
import PackageDealRow from "../components/cards/package-deal-row"

// Images (this feels wrong)
import coinShadow from '../images/logo-mygold-min.png'

import splashHero from '../images/backgrounds/img-hero-min.jpg'
import solutionHero from '../images/backgrounds/img-solution-dark-min.jpg'

import mgChevron from '../images/decorations/bullet-arrow.png'

import transparencyImg from '../images/thumbnails/icon-fulltransparency.png'
import inspectionImg from '../images/thumbnails/icon-regularinspections.png'
import auditingImg from '../images/thumbnails/icon-quarterlyauditing.png'
import purchaseImg from '../images/thumbnails/icon-purchaseagreements.png'
import smartContractImg from '../images/thumbnails/icon-smartcontracts.png'

const IndexPage = ({}) => {
  return (
  <Layout>
    <SEO title="Home" />

    {/* Hero splash row */}
    <Container
      fluid
      className="full-bg"
      style={{
        backgroundImage: 'url('+splashHero+')',
      }}
    >
      <Container className="hero-splash-header">
        <Row>
          <Col
            md="6"
            data-sal="slide-right"
            data-sal-duration="1000"
            data-sal-delay="300"
            data-sal-easing="ease"
          >
            <p className="text-gold">My-Gold Presents the</p>
            <h1 className="text-gold font-secondary fw-700">11::11 Token</h1>
            <p className="text-gold" style={{marginBottom: 60}}>The way to buy Australian Gold</p>

            <h2 className="text-white font-18 fw-600 mb-3 font-primary">FAST. EASY. SECURE. NEW.</h2>
              <div className="d-flex align-items-center mb-3">
                <img className="chevronArrow mr-2" src={mgChevron} />
                <p className="text-white font-18 fw-600 mb-0">Are you ready for a new way to purchase gold?</p>
              </div>

              <div className="d-flex align-items-center mb-3">
                <img className="chevronArrow mr-2" src={mgChevron} />
                <p className="text-white font-18 fw-600 mb-0">Are you interested in a new way to fund gold mining?</p>
              </div>

              <div className="d-flex align-items-center mb-3">
                <img className="chevronArrow mr-2" src={mgChevron} />
                <p className="text-white font-18 fw-600 mb-0">Are you prepared for a new strategy in the world of stable tokens?</p>
              </div>

            <p className="text-white mb-5">Introducing the 11::11 Token, backed by forward purchased gold agreements with traditional mining operations in Australia. Each token represents 1/1000 of an ounce of 999.9 fine gold. Become an affiliate of the 11::11 Token, a true gold standard in the community economy, today.</p>

            <TransitionLink
              className="primary-btn"
              to="purchase?package=1"
              exit={{
                delay: 0.3
              }}
            >Buy Now</TransitionLink>
          </Col>

          <Col
            md="6"
            data-sal="slide-left"
            data-sal-delay="300"
            data-sal-duration="1000"
            data-sal-easing="ease"
          >
            <img className="img-fluid" src={coinShadow} />
          </Col>
        </Row>
      </Container>
    </Container>


    {/* Introduction Row */}
    <Container fluid className="bg-slate" id="introduction">
      <Container className="intro-row">
        <Row>
          <Col md="6" className="mx-auto">
            <H3Underlined
              h3Text={"Introduction"}
            ></H3Underlined>
            <IntroCard
              stepNumber={"1"}
              stepText={"100% Gold backed token. The 11::11 Token is backed by forward purchased gold agreements to be delivered as bullion from traditional mining operations in Australia."}
            ></IntroCard>

            <IntroCard
              stepNumber={"2"}
              stepText={"Private gold owners (11::11 affiliates) receive an interest free overdraft facility in a hyper barter account."}
            ></IntroCard>

            <IntroCard
              stepNumber={"3"}
              stepText={"A market place and payments platform where credits can be used to Hyper Trade goods and services pier to pier, B2B and B2C utilising your free HyperBarter account."}
            ></IntroCard>

            <IntroCard
              stepNumber={"4"}
              stepText={"Each my-gold wallet underwrites its own hyperbarter account."}
            ></IntroCard>

            <IntroCard
              stepNumber={"5"}
              stepText={"My Gold has taken definitive measures to protect the gold reserve by registering securities over the mining companies, mining lease and all mining equipment to ensure that every 11::11 owner's gold is safe and secure."}
            ></IntroCard>

            <TransitionLink
              className="primary-btn"
              to="purchase"
              exit={{
                delay: 0.3
              }}
            >Buy Now</TransitionLink>
          </Col>

        </Row>
      </Container>
    </Container>



    {/* Solution Row */}
    <Container
      fluid
      id="solution"
      className="full-bg"
      style={{
        backgroundImage: 'url('+solutionHero+')',
      }}
    >
      <Container className="solution-row">
        <Row>
          <Col md="6" lg="8" className="mx-auto">
            <H3Underlined
              h3Text={"The my-gold solution"}
            ></H3Underlined>
          </Col>

          <Col md="6" lg="8" className="mx-auto">
            <p className="font-18 text-gold fw-600 font-primary">My-Gold distributes franctionalised tangible gold to any person who owns a mobile phone or computer. By using established, trusted blockchain protocols and platforms, My-Gold provides the easy and secure fractionalised distribution of real tangible* Gold straight to your pockets (or the phone in your pockets)</p>

            <p className="font-14 text-grey font-primary"> *Conditions apply. Request a copy of our white paper for further info.</p>

            <p className="font-16 text-white font-primary" style={{marginTop: 45}}>With the evolution of blockchain and encryption techniques, the blockchain technology allows data to be recorded securely and unalterably, thus creating a unique digital identity.</p>
            <p className="font-16 text-white font-primary" style={{marginBottom: 80}}>The blockchain is an incorruptible digital ledger of economic transactions that can be programmed to record not just financial transactions but virtually everything of value. As revolutionary as it sounds, Blockchain truly is a mechanism to bring everyone to the highest degree of accountability and transparency. No more missed transactions, human or machine errors, or even an exchange that was not done with the consent of the parties involved.</p>

            <p className="font-18 text-gold fw-600 font-primary" style={{marginBottom: 20}}>The 11::11 Token provides, easy, fast, instant acquisition of real tangible gold.</p>

            <p className="font-16 text-white font-primary">All 11::11 Tokens are 100% gold backed. This means that every token represents 1/1000 Oz of finite quantity of actual physical gold. 100,000 oz of 24ct gold has been secured on behalf of 11::11 owners which will be mined and delivered by the mining operations in Australia by the end of 2024.</p>
            <p className="font-16 text-white font-primary mb-5">Purchase the 11::11 token and become an affiliate of the new strategy in the world of stable tokens.</p>

            <TransitionLink
              className="primary-btn"
              to="purchase"
              exit={{
                delay: 0.3
              }}
            >Buy Now</TransitionLink>
          </Col>
        </Row>

        <Row>

        </Row>
      </Container>
    </Container>



    {/* Validation Row */}
    <Container fluid className="bg-slate validation-row" id="validation">
      <Container>
        <Row>
          <Col xs="12">
            <H3Underlined
              h3Text={"Validation & Security"}
            ></H3Underlined>
          </Col>

          <Col xs="12">
            <Row>
              <Col md="4" className="mb-5">
                <ValidationInfoCard
                  image={transparencyImg}
                  title={"Full Transparency"}
                  copy={"All 11::11 owners get full transparency into the operations and mining of the gold production."}
                ></ValidationInfoCard>
              </Col>

              <Col md="4" className="mb-5">
                <ValidationInfoCard
                  image={inspectionImg}
                  title={"Regular Inspection"}
                  copy={"Regular inspection and reports will be completed on the production of mining to ensure on time delivery of gold as per the schedule."}
                ></ValidationInfoCard>
              </Col>

              <Col md="4" className="mb-5">
                <ValidationInfoCard
                  image={auditingImg}
                  title={"Quarterly Auditing"}
                  copy={"Quarterly auditing will be carried out by an independent auditor to ensure proper accounting is upheld."}
                ></ValidationInfoCard>
              </Col>

              <Col md="4" className="mb-5">
                <ValidationInfoCard
                  image={purchaseImg}
                  title={"Purchase Agreements"}
                  copy={"Gold purchase agreement and all registered security agreements will be made available for all 11::11 owners."}
                ></ValidationInfoCard>
              </Col>

              <Col md="4" className="mb-5">
                <ValidationInfoCard
                  image={smartContractImg}
                  title={"Smart Contract"}
                  copy={"Copies of all securities and documents will be made available to all 11::11 owners. The smart contract driving the ERC20 token will operate in exact accordance with these securities. Once it is part of the Block chain it cannot be altered."}
                ></ValidationInfoCard>
              </Col>
            </Row>
          </Col>


        </Row>
      </Container>
    </Container>

    {/* Buy Row */}
    <Container fluid className="bg-dark-slate" id="jsBuyNow">
      <Container className="buy-now-row">
        <Row>
          <Col xs="12" md="8" className="mr-auto">
            <h2 className="fw-700 font-secondary font-gold mb-3" style={{fontSize: 40}}>Buy 11::11 Tokens now</h2>
            <p className="font-white" style={{marginBottom: 40}}>My-Gold allows you to purchase any quantity of 11::11 Tokens that suits your requirements. This could be purchases for yourself, children or even grand children, in packaged deals which entitle you to <span className="font-gold fw-700">FREE</span> bonus tokens as a thank you from us to you.</p>
          </Col>

          <Col xs="12" className="mx-auto">

            <H3Underlined
              h3Text={"PACKAGE DEALS*"}
            ></H3Underlined>

            <div className="package-deal-belt container">
              <div className="row d-none d-md-flex" style={{paddingLeft: 30, paddingTop: 16, paddingBottom: 16, borderBottom: '1px solid #70664b' }}>
                <Col md={3}>
                  <p className="mb-0 text-white text-uppercase fw-600 font-16 font-primary"><strong>Package</strong></p>
                </Col>
                <Col md={3}>
                  <p className="mb-0 text-white text-uppercase fw-600 font-16 font-primary text-center"><strong>Purchase</strong></p>
                </Col>
                <Col md={3}>
                  <p className="mb-0 text-white text-uppercase fw-600 font-16 font-primary text-center"><strong>Bonus (free) tokens</strong></p>
                </Col>
                <Col md={3}>
                  <p className="mb-0 text-white text-uppercase fw-600 font-16 font-primary"><strong></strong></p>
                </Col>
              </div>

              <PackageDealRow
                name="Package 1"
                purchaseTokens="100"
                bonusTokens="-"
                buyNowLink="purchase?package=1"
              ></PackageDealRow>

              <PackageDealRow
                name="Package 2"
                purchaseTokens="1000"
                bonusTokens="100"
                buyNowLink="purchase?package=2"
              ></PackageDealRow>

              <PackageDealRow
                name="Package 3"
                purchaseTokens="5000"
                bonusTokens="500"
                buyNowLink="purchase?package=3"
              ></PackageDealRow>

              <PackageDealRow
                name="Package 4"
                purchaseTokens="10000"
                bonusTokens="1000"
                buyNowLink="purchase?package=4"
              ></PackageDealRow>
            </div>

            <p className="font-14 font-grey" style={{marginTop: 40}}>*Over the Counter Deals are available and by negotiation for larger package deals. The current price of a individual 11::11 is the spot price of gold. MY-GOLD reserves the right to change the constituents of package deals without notice. </p>
          </Col>

        </Row>
      </Container>
    </Container>

  </Layout>
  )
}

export default IndexPage
