import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull
} from "graphql";
import ForgetPasswordController from "./Controller.js"
import ForgetPasswordMainSchema from "./Schema.js";


const ForgetPasswordMutations = {
	requestPasswordResetToken: {
		type: ForgetPasswordMainSchema,
		args: {
			email: {
				type: GraphQLString
			},
			returnUrl: {
				type: GraphQLString
			}
		},
		resolve(_, args) {
			return ForgetPasswordController.requestPasswordResetToken(_, args);
		}
	},
	resetPassword: {
		type: ForgetPasswordMainSchema,
		args: {
			token: {type: GraphQLString},
			email: {type: GraphQLString},
			password: {type: GraphQLString}
		},
		resolve(_, args) {
			return ForgetPasswordController.resetPassword(_, args);
		}
	}
}

export default ForgetPasswordMutations;