import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
} from "graphql";

import DB from "./../../database.js";

const UserMainSchema = new GraphQLObjectType({
	name: 'UserSchema',
	description: 'Graphql support for user',
	fields() {
		return {
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
			}
		}
	}
})


export default UserMainSchema