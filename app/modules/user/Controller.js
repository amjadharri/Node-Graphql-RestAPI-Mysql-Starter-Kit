import moment from "moment";
import bcrypt from "bcrypt";

import DB from "./../../database/database.js";
import { createJwtToken } from "./../../framework/validations/index.js";
import { validate } from "./../../framework/validations/index.js";
import mail from "./../../mailer/index";
import { validations } from "./schema.js";
import {sendEmail} from "./../../mailer/index.js"
let { MAILER_SERVICE_USERNAME, APP__APP_NAME } = process.env;

class UserController {




	async signup(_, args) {
		try {
			let { username, email, password } = args;
			let r = await validate(args, validations);
			if (r) {
				let user = await DB.models.user.findOne({
					where: { email: email }
				});
				if (user) {
					return {
						errorMessageType: "Already Registered",
						errorMessage: `${email} is already is Registered`
					}
				}
				let newUser = await DB.models.user.create({
					email: email,
					username: username,
					password: bcrypt.hashSync(password, 10)
				});
				sendEmail('welcome.hbs',{
						userName: email,
						siteName: process.env.APP__APP_NAME,
						date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
					},{
						from: 'ilyas.datoo@gmail.com',
						to: email,
						subject: `Welcome to ${process.env.APP__APP_NAME}`,
					});
				newUser.token = await createJwtToken(newUser);
				global.appEvents.onUserSignup();
				return newUser;
			} else {
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
	async login(_, args) {
		try {
			let { email, password } = args;
			if (email && password) {
				let user = await DB.models.user.findOne({
					where: {email: email}
				})
				if (user && bcrypt.compareSync(password, user.password)) {
					global.appEvents.onUserLogin();
					user.token = await createJwtToken(user);
					return user
				}else {
					return {
						errorMessageType: "Incorrect Password And/Or Email", 
						errorMessage: "You have entered incorrect Password And/Or Email"
					}
				}
			}else {
				return {
					errorMessageType: "Missing details",
					errorMessage: "Please enter your Email & Password"
				}
			}
		} catch (e) {
			return {
				errorMessageType: "Error from our side",
				errorMessage: e.message
			}
		}
	}


	async refreshToken(_, args) {
		try {
			let {email,token} = args;
			let user = await DB.models.user.findOne({
				where: {email: email,token: token}
			});
			if (!user) {
				return {
					errorMessageType: "No user found",
					errorMessage: "No user found with that token",
				}
			}
			token = await createJwtToken(user);
			await user.updateAttributes({
				token: token,
			});
			return user;
		} catch (e) {
			return {
				errorMessageType: 'Backend Error',
				errorMessage: `Something went wrong, ${e.message}`
			}
		}
	}

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
					sendEmail('changePassword.hbs',{
						email: email,
						siteName: process.env.APP__APP_NAME,
						userName: email,
					},{
						from: 'ilyas.datoo@gmail.com',
						to: email,
						subject: `Password changed for ${process.env.APP__APP_NAME}`,
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