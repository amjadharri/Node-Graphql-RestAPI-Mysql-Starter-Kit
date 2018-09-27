import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull
} from "graphql";
import UserMainSchema from "./schema.js";
import UserController from "./Controller.js"

const UserMutations  = {
	refreshToken: {
		type: UserMainSchema,
		args: {
			email: {type: GraphQLString},
			token: {type: GraphQLString}
		},
		resolve(_, args) {
			return UserController.refreshToken();
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
	login: {
		type: UserMainSchema,
		args: {
			email: {type: GraphQLString},
			password: {type: GraphQLString},
		},
		resolve(_,args) {
			return UserController.login(_, args);
		}
	},
	signup: {
		type: UserMainSchema,
		args: {
			username: {type: GraphQLString},
			email: {type: GraphQLString},
			password: {type: GraphQLString}
		},
		resolve(_,args) {
			return UserController.signup(_, args);
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