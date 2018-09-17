import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
} from "graphql";
import UserMainSchema from "./schema.js";
import UserController from "./Controller.js";

const UserQueries = {
	user: {
		type: UserMainSchema,
		args: {
			id: {
				type: GraphQLInt
			},	
			email: {
				type: GraphQLString
			},
			gender: {
				type: GraphQLString
			},
			name: {
				type: GraphQLString
			},
			email: {
				type: GraphQLString
			},
			username: {
				type: GraphQLString
			}
		},
		resolve(root, args) {
			return UserController.userView(root, args);
		}
	},
}

export default UserQueries