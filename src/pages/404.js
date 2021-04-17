import React from "react"

import { Link } from "gatsby"

// import Layout from "../components/layout"
import LayoutNoScroll from "../components/layout-no-scroll"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <LayoutNoScroll>
    <SEO title="404: Not found" />
    <h1>404: Page Not Found</h1>
    <Link to="/">Return home</Link> <br />
  </LayoutNoScroll>
)

export default NotFoundPage
