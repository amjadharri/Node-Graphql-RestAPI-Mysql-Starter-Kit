
import DB from "./../../database/database.js";
import {createJwtToken} from "./../../framework/validations/index.js";
import {
	validate
} from "./../../framework/validations/index.js";

import bcrypt from "bcrypt";

import {validations} from "./schema.js";

class UserController {
	allUsers(_, args) {
		return DB.models.user.findAll({where: args})
	}
	async login(_, args) {
		if (args.email && args.password) {
			let user = await DB.models.user.findOne({
				where: {email: args.email}
			})
			if (user) {
				user.token = await createJwtToken(user);
				return user;
			}else {
				return { errorMessageType: "Incorrect Password And/Or Email", errorMessage: "You have entered incorrect Password And/Or Email"};
			}
		}else {
			return {
				errorMessageType: "Missing details",
				errorMessage: "Please enter your Email & Password"
			}
		}
	}
	async create(_, args) {
		try {

		let r = await validate(args, validations);
			if (r) {
				let user = await DB.models.user.findOne({
					where: {email: args.email}
				});
				if (user) {
					return {
						errorMessageType: "Already Registered",
						errorMessage: `${args.email} is already is Registered`
					}
				}
				let newUser =  await DB.models.user.create({
					email: args.email,
					username: args.username,
					password: bcrypt.hashSync(args.password, 10)
				});
				newUser.token = await createJwtToken(newUser);
				return newUser;
			}else {
				return {
					errorMessageType: "Missing details ",
					errorMessage: "You have form issues please check your form."
				}
			}
		} catch (e) {
			return {
				errorMessageType: "Error from our side",
				errorMessage: e.message
			}
		}
	}
}


export default new UserController