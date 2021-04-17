import React from "react"

// Component itself
const ValidationInfoCard = ({ image, title, copy }) => {
	return (
		<>
            <div className="validation-info-card">
                <img className="val-info-img" src={image} />
                <p className="font-18 font-white mb-2"><strong>{title}</strong></p>
                <p className="mb-0 font-16 font-white">{copy}</p>
            </div>
        </>
	)
}

export default ValidationInfoCard