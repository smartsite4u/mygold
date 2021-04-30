require('dotenv').config({
	path: `./.env.${process.env.NODE_ENV}`,
})
const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = {
	siteMetadata: {
		title: `11::11 My-Gold`,
		description: `A site built by Sprint Digital`,
		author: `Sprint Digital`,
		
		// Test 13-01-21, might not work when URL changes?
		// siteURL: 'https://unruffled-knuth-16b31c.netlify.app',
		
	},
	developMiddleware: app => {
		app.use(
			"/.netlify/functions/",
			createProxyMiddleware({
				target: "http://localhost:9000",
				pathRewrite: {
					"/.netlify/functions/": "",
				},
			})
		)
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-stripe`,
			options: {
				objects: ['Price'],
				secretKey: process.env.STRIPE_SECRET_KEY=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, 
				downloadFiles: false,
			},
		},
		`gatsby-plugin-sass`,
		`gatsby-plugin-scroll-reveal`,
		`gatsby-plugin-smoothscroll`,
		`gatsby-plugin-transition-link`,
		`gatsby-plugin-nodejs`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/logo-mygold-min.png`, // This path is relative to the root of the site.
			},
		},
		{
			resolve: "gatsby-plugin-firebase",
			options: {
				credentials: {
					apiKey: `${process.env.GATSBY_FIREBASE_APIKEY}`,
					projectId: `${process.env.GATSBY_FIREBASE_PROJECTID}`,
					authDomain: `${process.env.GATSBY_FIREBASE_AUTHDOMAIN}`,
					storageBucket: `${process.env.GATSBY_FIREBASE_STORAGEBUCKET}`,
					messagingSenderId: `${process.env.GATSBY_FIREBASE_MESSAGINGSENDERID}`,
					appId: `${process.env.GATSBY_FIREBASE_APPID}`,
					measurementId: `${process.env.GATSBY_FIREBASE_MEASUREMENTID}`
				}
			}
		}
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
}
