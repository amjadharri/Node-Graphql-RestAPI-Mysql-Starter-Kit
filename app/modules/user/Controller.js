import moment from "moment";
import bcrypt from "bcrypt";

import DB from "./../../database/database.js";
import { createJwtToken } from "./../../framework/validations/index.js";
import { validate } from "./../../framework/validations/index.js";
import mail from "./../../mailer/index";
import { validations } from "./schema.js";
let { MAILER_SERVICE_USERNAME, APP__APP_NAME } = process.env;

class UserController {

	// api requests start


	async signup(req, res) {
		try {
			let { body: {username, email, password} } = req;
			let r = await validate(req.body, validations);
			if (r) {
				let user = await DB.models.user.findOne({
					where: { email: email }
				});
				if (user) {
					res.json({
						errorMessageType: "Already Registered",
						errorMessage: `${email} is already is Registered`
					});
				}
				let newUser = await DB.models.user.create({
					email: email,
					username: username,
					password: bcrypt.hashSync(password, 10)
				});
				newUser.token = await createJwtToken(newUser);
				res.json(newUser);
			} else {
				res.json({
					errorMessageType: "Missing details ",
					errorMessage: "You have form issues please check your form."
				})
			}
		} catch (e) {
			res.json({
				errorMessageType: "Error from our side",
				errorMessage: e.message
			})
		}
	}
	async login(req, res) {
		try {
			let { body: { email, password } } = req;
			if (email && password) {
				let user = await DB.models.user.findOne({
					where: {email: email}
				})
				if (user && bcrypt.compareSync(password, user.password)) {
					user.token = await createJwtToken(user);
					res.json(user)
				}else {
					res.json({
						errorMessageType: "Incorrect Password And/Or Email", 
						errorMessage: "You have entered incorrect Password And/Or Email"
					})
				}
			}else {
				res.json({
					errorMessageType: "Missing details",
					errorMessage: "Please enter your Email & Password"
				})
			}
		} catch (e) {
			res.json({
				errorMessageType: "Error from our side",
				errorMessage: e.message
			})
		}
	}

	// api requests end

	async userView(_, args) {
		try {
			return await DB.models.user.findById(args.id);
		} catch (e) {
			return {
				errorMessageType: 'Backend Error',
				errorMessage: `Something went wrong, ${e.message}`
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
}


export default new UserController