import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull
} from "graphql";
import UserMainSchema from "./schema.js";
import DB from "./../../database.js";


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
		resolve(_, args) { 
			return DB.models.user.create({
				email: args.email,
				username: args.username,
				password: args.password
			})
		}
	}
}


export default UserMutations