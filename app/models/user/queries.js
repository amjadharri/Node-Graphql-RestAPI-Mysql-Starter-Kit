import {
	GraphQLList,
	GraphQLInt,
	GraphQLString
} from "graphql";
import UserMainSchema from "./schema.js";
import DB from "./../../database.js";

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
			return DB.models.user.findAll({where: args})
		}
	},
}

export default UserQueries