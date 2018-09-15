
import DB from "./../../database/database.js";
import {createJwtToken} from "./../../framework/validations/index.js";
import {
	validate
} from "./../../framework/validations/index.js";

import mail from "./../../mailer/index";
import moment from "moment";

import bcrypt from "bcrypt";

import {validations} from "./schema.js";

let {
	MAILER_SERVICE_USERNAME,
	APP__APP_NAME
} = process.env;

class UserController {
	allUsers(_, args) {
		return DB.models.user.findAll({where: args})
	}
	async login(_, args) {
		if (args.email && args.password) {
			let user = await DB.models.user.findOne({
				where: {email: args.email}
			})
			if (user && bcrypt.compareSync(args.password, user.password)) {
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
	async changePassword(_, args) {
		try {
			let {id, oldPassword, newPassword} = args;
			let user = await DB.models.user.findById(id);
			if (user) {
				let {email} = user;
				if (bcrypt.compareSync(oldPassword, user.password)) {
					await user.updateAttributes({
						password: bcrypt.hashSync(newPassword, 10),
					});
					mail.sendMail({
						from: MAILER_SERVICE_USERNAME,
						to: email,
						subject: `Your Password is changed for ${APP__APP_NAME}`,
						html: `We want to let you know that, at ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')} you have changed your password for ${APP__APP_NAME}.`
					});
					return { successMessageType: "Password Changed", successMessage: `Password successfully changed for ${user.email}` };
				}else {
					return { errorMessageType: "Incorrect Password", errorMessage: "You have entered incorrect Password" };
				}
			}else {
				return {
					errorMessageType: "No User found.",
					errorMessage: "No user found please try again"
				}
			}
		} catch (e) {
			return {
				errorMessageType: "Error from our side",
				errorMessage: e.message
			}
		}
	}
	async updateProfile(_, args) {
		try {
			let {id, name, gender} = args;
			let user = await DB.models.user.findById(id);
			if (user) {
				await user.updateAttributes({
					name: name,
					gender: gender
				});
				return {
					successMessageType: "Profile Updated",
					successMessage: "Profile updated successfully"
				}
			}else {
				return {
					errorMessageType: "No User found",
					errorMessage: "No user found please try again."
				}
			}
		} catch (e) {
			return {
				errorMessageType: "Error from our side",
				errorMessage: e.message
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