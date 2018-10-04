import Joi from "joi";
import jwt from "jsonwebtoken";
import moment from "moment";
import gql from 'graphql-tag';
let {APP__ALLOW_FAKE_AUTHORIZATION} = process.env;

export async function validate(data, schema) {
	try {
		let response = await Joi.validate(data, schema);
		return {
			isValid: true,
		}
	} catch(e) {
		return {
			isValid: false,
			details: e.details
		};
	}
}

export async function validateAccessToken(req, res, next) {
	let method = req.method.toLowerCase();
	let {body: {query}} = req;
	if (query) {
		try {
			let parsed = gql`${query}`;
			let queryName = parsed.definitions[0].selectionSet.selections[0].name.value;
			let auth = ["signup","resetPassword","requestPasswordResetToken","login"];
			let isAuth = auth.indexOf(queryName) > -1;
			if (isAuth) {
				next();
			}else {
				let authorization = req.headers.authorization || "...";
				if (APP__ALLOW_FAKE_AUTHORIZATION == 'TRUE') {
					if (authorization == 'fake') {
						next();
						return;
					}
				}
				if (authorization == "...") {
					res.json({
						errorMessageType: "Token missing",
						errorMessage: "Please provide authorization token"
					});
					return false;
				}
				authorization = authorization.split(" ")[1];
				authorization = authorization.replace("'", "");
				authorization = authorization.replace("'", "");
				var decoded = jwt.decode(authorization, 'secret') || {}; // pass empty object when decode failed
				if (decoded.hasOwnProperty('validateFor')) {
					next();
					return true;
				}else {
					res.json({
						status: false,
						message: "Permission denied. Please check your authorization token"
					})
					return false;
				}
			}
		} catch (e) {
			res.json({
				errorMessageType: "Error in query",
				errorMessage: e.message
			})
		}
	}else {
		if (method == 'get') {
			next();
		}else {
			res.json({
				errorMessageType: "Query not send",
				errorMessage: "Please send query"
			})
		}
	}
}

// create jwt token for user.
export async function createJwtToken(data) {
	return jwt.sign({
	  data: {
	  	user: data.id,
			email: data.email,
			validateFor: "general"
	  }
	}, 'secret', { 
		expiresIn: moment().add('1', 'days').seconds()
	});
}

// create access token for non auth users. Note: this will stop users from accessing without token or from other resources.
export async function createAccessToken(data) {
	return jwt.sign({
	  data: {
			validateFor: "authPurpose",
			createdAt: moment().valueOf()
	  }
	}, 'secret', { 
		expiresIn: moment().add('1', 'days').seconds()
	});
}

