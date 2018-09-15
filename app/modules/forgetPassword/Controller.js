
import DB from "./../../database/database.js";
import moment from "moment";
import bcrypt from "bcrypt";


class ForgetPasswordController {
	async requestPasswordResetToken(_, args) {
		let {email} = args;
		if (email) {
			let user = await DB.models.user.findOne({
				where: {
					email: email
				}
			})
			if (user) {
				await DB.models.forgetPassword.create({
					token: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
					userId: user.id,
					expireDate: `${moment().add('30','minutes').valueOf()}`
				});
				return {
					successMessageType: "Successfull",
					successMessage:  "Please check your email. We have sent a link to reset your email"
				}
			}else {
				return {
					errorMessage: "No User found",
					errorMessageType: "No user found with that email"
				}
			}
		}else {
			return {
				errorMessage: "Email not provided",
				errorMessageType: "Please provide your email"
			}
		}
	}
	async resetPassword(_,args) {
		try {
			let {token, email, password} = args;
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
						return { successMessageType: "Password Changed", successMessage: `Password successfully changed for ${user.email}` };
					}else {
						return {
							errorMessageType: "User Not Found",
							errorMessage: "User not found to update password."
						}
					}
				}else {
					return {
						errorMessageType: "Token Mismatched",
						errorMessage: "The token you provided is mismatched or expired."
					}
				}
			}else {
				return {
					errorMessageType: "Details not provided",
					errorMessage: "Please provide Token, Email and/or Password"
				}
			}
		} catch (e) {
			return {
				errorMessageType: "Something went wrong",
				errorMessage: "Something went wrong from our side. Message: " + e.message,
			}
		}
	}
}


export default new ForgetPasswordController