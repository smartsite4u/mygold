require('dotenv').config({
	path: `./.env.${process.env.NODE_ENV}`,
})
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.handler = async function(event, context, callback) {
    const session = await stripe.checkout.sessions.retrieve(JSON.parse(event.body).sessionId);
	return {
		statusCode: 200,
		body: JSON.stringify({ session }),
	  }
 }