import React from "react"

// Component itself
const IntroCard = ({ stepNumber, stepText }) => {
	return (
		<>
            <div className="intro-step-card">
                <div className="step-number">
                    <p className="">{stepNumber}</p>
                </div>
                <p className="mb-0">{stepText}</p>
            </div>
        </>
	)
}

export default IntroCard