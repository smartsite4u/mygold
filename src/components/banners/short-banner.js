import React from "react"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Component itself
const ShortBanner = ({ bgImage, children }) => {
	return (
		<>
            <Container
            fluid
            className="full-bg"
            style={{
                backgroundImage: 'url('+bgImage+')',
                paddingTop: 60,
                paddingBottom: 60,
            }}
            >
                <Container>
                    <Row>
                        <Col>
                            {children}
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
	)
}

export default ShortBanner