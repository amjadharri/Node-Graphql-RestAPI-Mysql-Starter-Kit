import Joi from "joi";
import jwt from "jsonwebtoken";
import moment from "moment";

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
	let {body: {query}} = req;
	if (!query) {
		res.json({
			status: false,
			message: "Query was not passed"
		});
		return false;
	}
	let split = query.split("\n")[1];
	let auth = ["signup","resetPassword","requestPasswordResetToken"];
	let isAuth = split.indexOf('login') > -1 ||  split.indexOf('signup') > -1 ||   split.indexOf('resetPassword') > -1 ||  split.indexOf('requestPasswordResetToken') > -1;
	if (isAuth) {
		next();
	}else {
		let authorization = req.headers.authorization || "...";
		if (authorization == "...") {
			res.json({
				status: false,
				message: "Please provide authorization token"
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

