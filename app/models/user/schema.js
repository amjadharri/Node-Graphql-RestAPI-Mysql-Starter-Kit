import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
} from "graphql";




export default new GraphQLObjectType({
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