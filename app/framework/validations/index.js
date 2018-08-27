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


export async function createJwtToken(data) {
	return jwt.sign({
	  data: {
	  	user: data.id,
	  	email: data.email
	  }
	}, 'secret', { 
		expiresIn: moment().add('1', 'days').seconds()
	});
}