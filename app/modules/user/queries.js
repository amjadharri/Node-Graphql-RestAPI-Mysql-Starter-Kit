import {
	GraphQLList,
	GraphQLInt,
	GraphQLString
} from "graphql";
import UserMainSchema from "./schema.js";
import UserController from "./Controller.js"

const UserQueries = {
	user: {
		type: new GraphQLList(UserMainSchema),
		args: {
			id: {
				type: GraphQLInt
			},	
			email: {
				type: GraphQLString
			}
		},
		resolve(root, args) {
			return UserController.allUsers(root, args);
		}
	},
	login: {
		type: UserMainSchema,
		args: {
			email: {
				type: GraphQLString
			},
			password: {
				type: GraphQLString
			},
		},
		resolve(_, args) {
			try {
				return UserController.login(_,args);
			} catch (e) {
				console.log(e);
			}
		}
	}
}

export default UserQueries