import Joi from 'joi';
import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
} from "graphql";

import DB from "./../../database/database.js";

export let validations = Joi.object().keys({
	email: Joi.string().email().required(),
});


const ForgetPasswordMainSchema = new GraphQLObjectType({
	name: 'ForgetPasswordMainSchema',
	description: 'Graphql support for forgetPassword model',
	fields() {
		return {
			errorMessage: {
				type: GraphQLString,
				resolve(forgetPassword) {
					return forgetPassword.errorMessage || '';
				}
			},
			successMessage: {
				type: GraphQLString,
				resolve(forgetPassword) {
					return forgetPassword.successMessage || '';
				}
			},
			successMessageType: {
				type: GraphQLString,
				resolve(forgetPassword) {
					return forgetPassword.successMessageType || '';
				}
			},
			token: {
				type: GraphQLString,
				resolve(forgetPassword) {
					return forgetPassword.token || '';
				}
			},
			errorMessageType: {
				type: GraphQLString,
				resolve(forgetPassword) {
					return forgetPassword.errorMessageType || '';
				}
			},
			id: {
				type: GraphQLInt,
				resolve(forgetPassword) {
					return forgetPassword.id;
				}
			},
			email: {
				type: GraphQLInt,
				resolve(forgetPassword) {
					return forgetPassword.email;
				}
			},
			createdAt: {
				type: GraphQLString,
				resolve(forgetPassword) {
					return forgetPassword.createdAt;
				} 
			},
			updatedAt: {
				type: GraphQLString,
				resolve(forgetPassword) {
					return forgetPassword.updatedAt;
				}
			},
		}
	}
})


export default ForgetPasswordMainSchema
