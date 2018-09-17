import moment from "moment";
import bcrypt from "bcrypt";

import DB from "./../../database/database.js";
import mail from "./../../mailer/index"
class ForgetPasswordController {
	async requestPasswordResetToken(req, res) {
		try {
			let {body: {email, returnUrl}} = req;
			if (email && returnUrl) {
				let user = await DB.models.user.findOne({
					where: {
						email: email
					}
				})
				if (user) {
					let token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
					mail.sendMail({
						from: 'ilyas.datoo@gmail.com',
						to: email,
						subject: `Reset your account password for ${process.env.APP__APP_NAME}`,
						html: `You can reset your password <a href="${returnUrl}?token=${token}" >Here</a>. This email is valid for next 30 minutes until ${moment().add('30', 'minutes').format('dddd, MMMM Do YYYY, h:mm:ss a')}`
					});
					await DB.models.forgetPassword.create({
						token: token,
						userId: user.id,
						expireDate: `${moment().add('30','minutes').valueOf()}`
					});
					res.json({
						successMessageType: "Successfull",
						successMessage:  "Please check your email. We have sent a link to reset your email"
					});
				}else {
					res.json({
						errorMessage: "No User found",
						errorMessageType: "No user found with that email"
					});
				}
			}else {
				res.json({
					errorMessage: "Email and Return Url not provided",
					errorMessageType: "Please provide your Email and Return Url"
				});
			}
		} catch (e) {
			res.json({
				errorMessageType: "Error from our side",
				errorMessage: e.message
			});
		}
	}
	async resetPassword(req, res) {
		try {
			let {body: { token, email, password } } = req;
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
						await user.updateAttributes({
							password: bcrypt.hashSync(password, 10),
						});
						await DB.models.forgetPassword.destroy({
							where: {
								token: token 
							}
						});
						res.json({
							successMessageType: "Password Changed", 
							successMessage: `Password successfully changed for ${user.email}` 
						})
					}else {
						res.json({
							errorMessageType: "User Not Found",
							errorMessage: "User not found to update password."
						})
					}
				}else {
					res.json({
						errorMessageType: "Token Mismatched",
						errorMessage: "The token you provided is mismatched or expired."
					})
				}
			}else {
			
				res.json({
					errorMessageType: "Details not provided",
					errorMessage: "Please provide Token, Email and/or Password"
				})
			}
		} catch (e) {
			res.json({
				errorMessageType: "Something went wrong",
				errorMessage: "Something went wrong from our side. Message: " + e.message,
			})
		}
	}
}

export default new ForgetPasswordController