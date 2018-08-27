import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull
} from "graphql";
import UserMainSchema from "./schema.js";
import DB from "./../../database/database.js";
import UserController from "./UserController.js"

const UserMutations  = {
	createUser: {
		type: UserMainSchema,
		args: {
			email: {
				type: new GraphQLNonNull(GraphQLString)
			},
			username: {
				type: new GraphQLNonNull(GraphQLString)
			},
			password: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		async resolve(_, args) {
			return UserController.create(_, args);
			
		}
	},
	login: {
		type: UserMainSchema,
		args: {
			email: {
				type: new GraphQLNonNull(GraphQLString)
			},
			password: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		async resolve(_, args) {
			
		}
	}
}


export default UserMutations