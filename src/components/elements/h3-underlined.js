import React from "react"

// Component itself
const H3Underlined = ({ h3Text }) => {
	return (
		<>
            <div>
                <h3>{h3Text}</h3>
                <div
                    style={{
                        marginTop: 10,
                        marginBottom: 20,
                        width: 50,
                        height: 1,
                        backgroundColor: "#ff543e",
                    }}
                ></div>
            </div>

        </>
	)
}

export default H3Underlined