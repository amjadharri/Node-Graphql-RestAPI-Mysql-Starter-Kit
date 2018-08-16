import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLObjectType,
	GraphQLSchema
} from "graphql";
import UserSchema from "./models/user/schema.js";
import ForgetPasswordSchema from "./models/forgetPassword/schema.js";
import DB from "./database.js"

const Query = new GraphQLObjectType({
	name: "Query",
	description: "Root query object",
	fields() {
		return {
			user: {
				type: new GraphQLList(UserSchema),
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
			}
		}
	}
});

const MainSchema = new GraphQLSchema({
  query: Query
});



export default MainSchema;