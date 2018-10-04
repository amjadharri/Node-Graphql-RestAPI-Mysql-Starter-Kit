import moment from "moment";
import bcrypt from "bcrypt";
import handlebars from "handlebars";
import fs from "fs";
import {sendEmail} from "./../../mailer/index.js"

import DB from "./../../database/database.js";
import mail from "./../../mailer/index"
class ForgetPasswordController {
	async requestPasswordResetToken(_, args) {
		try {
			let {email, returnUrl} = args;
			if (email && returnUrl) {
				let user = await DB.models.user.findOne({
					where: {
						email: email
					}
				})
				if (user) {
					let token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
					sendEmail('requestPasswordResetToken.hbs',{
						email: email,
						nextMinutes:  `${moment().add('30','minutes').format("dddd, MMMM Do YYYY, h:mm:ss a")}`
					},{
						from: 'ilyas.datoo@gmail.com',
						to: email,
						subject: `Reset your account password for ${process.env.APP__APP_NAME}`,
					});
					await DB.models.forgetPassword.create({
						token: token,
						userId: user.id,
						expireDate: `${moment().add('30','minutes').valueOf()}`
					});
					global.appEvents.onRequestPasswordResetToken();
					return {
						successMessageType: "Successfull",
						successMessage:  "Please check your email. We have sent a link to reset your email",
						statusCode: 'CREATED'
					};
				}else {
					return {
						errorMessage: "No User found",
						errorMessageType: "No user found with that email",
						statusCode: 'BAD_REQUEST'
					};
				}
			}else {
				return {
					errorMessage: "Email and Return Url not provided",
					errorMessageType: "Please provide your Email and Return Url",
					statusCode: 'BAD_REQUEST'
				};
			}
		} catch (e) {
			return {
				errorMessageType: "Error from our side",
				errorMessage: e.message,
				statusCode: 'INTERNAL_SERVER_ERROR'
			};
		}
	}
	async resetPassword(_, args) {
		try {
			let { token, email, password } = args;
			if (token && email && password) {
				let forgetPasswordItem = await DB.models.forgetPassword.findOne({
					where: {
						token: token
					}
				})
				if (forgetPasswordItem) {
					let user = await DB.models.user.findOne({
						where: {
							email: email
						}
					});
					if (user) {
						sendEmail('changePassword.hbs',{
							email: email,
							siteName: process.env.APP__APP_NAME,
							userName: email,
						},{
							from: 'ilyas.datoo@gmail.com',
							to: email,
							subject: `Password changed for ${process.env.APP__APP_NAME}`,
						});
						await user.updateAttributes({
							password: bcrypt.hashSync(password, 10),
						});
						await DB.models.forgetPassword.destroy({
							where: {
								token: token 
							}
						});

						global.appEvents.onResetPasword();
						return {
							successMessageType: "Password Changed", 
							successMessage: `Password successfully changed for ${user.email}`,
							statusCode: 'CREATED'
						}
					}else {
						return {
							errorMessageType: "User Not Found",
							errorMessage: "User not found to update password.",
							statusCode: 'BAD_REQUEST'
						}
					}
				}else {
					return {
						errorMessageType: "Token Mismatched",
						errorMessage: "The token you provided is mismatched or expired.",
						statusCode: 'BAD_REQUEST'
					}
				}
			}else {
			
				return {
					errorMessageType: "Details not provided",
					errorMessage: "Please provide Token, Email and/or Password",
					statusCode: 'BAD_REQUEST'
				}
			}
		} catch (e) {
			return {
				errorMessageType: "Something went wrong",
				errorMessage: "Something went wrong from our side. Message: " + e.message,
				statusCode: 'INTERNAL_SERVER_ERROR'
			}
		}
	}
}

export default new ForgetPasswordController