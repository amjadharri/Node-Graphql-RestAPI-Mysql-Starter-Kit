import Joi from 'joi';
import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
} from "graphql";

import DB from "./../../database/database.js";

export let validations = Joi.object().keys({
	email: Joi.string().email().required(),
	password: Joi.string().min(5).max(30).required()
});

const UserMainSchema = new GraphQLObjectType({
	name: 'UserSchema',
	description: 'Graphql support for user',
	fields() {
		return {
			errorMessage: {
				type: GraphQLString,
				resolve(user) {
					return user.errorMessage || '';
				}
			},
			successMessage: {
				type: GraphQLString,
				resolve(model) {
					return model.successMessage || '';
				}
			},
			successMessageType: {
				type: GraphQLString,
				resolve(model) {
					return model.successMessageType || '';
				}
			},
			token: {
				type: GraphQLString,
				resolve(user) {
					return user.token || '';
				}
			},
			errorMessageType: {
				type: GraphQLString,
				resolve(user) {
					return user.errorMessageType || '';
				}
			},
			id: {
				type: GraphQLInt,
				resolve(user) {
					return user.id;
				}
			},
			username: {
				type: GraphQLString,
				resolve(user) {
					return user.username;
				}
			},
			email: {
				type: GraphQLString,
				resolve(user) {
					return user.email;
				}
			},
			gender: {
				type: GraphQLString,
				resolve(user) {
					return user.gender;
				}
			},
			createdAt: {
				type: GraphQLString,
				resolve(user) {
					return user.createdAt;
				} 
			},
			updatedAt: {
				type: GraphQLString,
				resolve(user) {
					return user.updatedAt;
				}
			},
		}
	}
})


export default UserMainSchema