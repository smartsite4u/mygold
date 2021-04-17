require('dotenv').config({
	path: `./.env.${process.env.NODE_ENV}`,
})
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.handler = async function(event, context, callback) {
	let payable = parseInt(JSON.parse(event.body).payable*100);
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [
			{
				price_data: {
					currency: 'aud',
					product_data: {
						name: '11::11 MyGold',
						images: [`${process.env.GATSBY_APP_URL}/static/${process.env.GATSBY_STRIPE_IMG}`],
					},
					unit_amount: payable,
				},
				quantity: 1,
			},
		],
		mode: 'payment',
		success_url: `${event.headers.origin}/success?sessionId={CHECKOUT_SESSION_ID}`,
		cancel_url: `${event.headers.origin}/canceled`,
	});
	/* console.log("queryStringParameters", process) */
	return {
		statusCode: 200,
		body: JSON.stringify({ id: session.id }),
	  }
 }