/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import {Helmet} from "react-helmet";

import HeaderNoScroll from "./header-no-scroll"

// import "./layout.css"

import Footer from "./navigation/footer"

const LayoutNoScroll = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQueryNoScroll {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://use.typekit.net/oey8gnl.css" />
      </Helmet>

      <HeaderNoScroll siteTitle={data.site.siteMetadata?.title || `Title`} />

      <div>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

LayoutNoScroll.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutNoScroll
