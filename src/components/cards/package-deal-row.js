import React from "react"
import TransitionLink from 'gatsby-plugin-transition-link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


// Component itself
const PackageDealRow = ({ name, purchaseTokens, bonusTokens, buyNowLink }) => {
	return (
		<>
            <Row className="align-items-center package-deal-row">

                <Col md={3} className="text-left">
                    <p className="mb-3 mb-md-0 text-white">{name}</p>
                </Col>

                <Col md={3}>
                    <div className="d-flex flex-row flex-md-column justify-content-between align-items-center mb-3 mb-md-0 ">
                        <p className="text-uppercase text-white mb-0 d-block d-md-none">Purchase:</p>
                        <div className="d-flex flex-row flex-md-column align-items-md-center" style={{minWidth: 145,}}>
                            <p className="mb-0 text-white mb-0 fw-600 mr-2 mr-md-0" style={{fontSize: 24,}}>{purchaseTokens}</p>
                            <p className="text-white mb-0">Tokens</p>
                        </div>
                    </div>
                </Col>

                <Col md={3}>
                    <div className="d-flex flex-row flex-md-column justify-content-between align-items-center mb-3 mb-md-0 ">
                        <p className="text-uppercase text-white mb-0 d-block d-md-none" style={{maxWidth: 139,}}>Bonus (free) tokens:</p>
                        <div className="d-flex flex-row flex-md-column align-items-md-center" style={{minWidth: 145,}}>
                            <p className="mb-0 text-white mb-0 fw-600 mr-2 mr-md-0" style={{fontSize: 24,}}>{bonusTokens}</p>
                            <p className="text-white mb-0">Free</p>
                        </div>
                    </div>
                </Col>

                <Col md={3} className="d-flex">
							<TransitionLink
								className="primary-btn"
								to={buyNowLink}
								exit={{
									delay: 0.3
								}}
							>Buy Now</TransitionLink>
                </Col>
            </Row>
        </>
	)
}

export default PackageDealRow