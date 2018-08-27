import Joi from 'joi';
import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
} from "graphql";

import DB from "./../../database/database.js";

export let validations = Joi.object().keys({
	username: Joi.string().min(5).max(30).required(),
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