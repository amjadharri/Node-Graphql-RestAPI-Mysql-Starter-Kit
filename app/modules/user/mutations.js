import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull
} from "graphql";
import UserMainSchema from "./schema.js";
import UserController from "./Controller.js"

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
	},
	updateProfile: {
		type: UserMainSchema,
		args: {
			name: {type: GraphQLString},
			gender: {type: GraphQLString},
			id: { type: new GraphQLNonNull(GraphQLInt)},
		},
		resolve(_, args) {
			return UserController.updateProfile(_, args);
		}
	},
	changePassword: {
		type: UserMainSchema,
		args: {
			id: {
				type: new GraphQLNonNull(GraphQLInt)
			},
			oldPassword: {
				type: new GraphQLNonNull(GraphQLString)
			},
			newPassword: {
				type: new GraphQLNonNull(GraphQLString)
			}
		},
		resolve(_, args) {
			return UserController.changePassword(_, args);
		}
	}
}


export default UserMutations;