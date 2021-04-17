import React from "react"


// Component itself
const ContactForm = () => (

    <form
        name="contact"
        className="purchase-form"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
    >
        {/* <label className="d-none">Don't fill this out<input name="bot-field" /></label> */}

        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contact" />

        <div className="d-flex flex-column purchase-form-wrap">

            <div className="d-flex flex-column flex-md-row align-items-center">
            <label htmlFor="contactname">Name</label>
            <input type="text" name="contactname" id="contactname"/>
            </div>

            <div className="d-flex flex-column flex-md-row align-items-center">
            <label htmlFor="contactemail">Email Address</label>
            <input type="text" name="contactemail" id="contactemail"/>
            </div>

            <div className="d-flex flex-column flex-md-row align-items-center">
            <label htmlFor="contactphone">Phone</label>
            <input type="text" name="contactphone" id="contactphone"/>
            </div>

            <div className="d-flex flex-column">
            <label htmlFor="contactmessage" style={{marginBottom: 10,}}>Messages</label>
            <textarea name="contactmessage" id="contactmessage" rows="7"></textarea>
            </div>

            <button className="w-100 primary-btn" type="submit">Submit</button>
        </div>
    </form>

)


export default ContactForm