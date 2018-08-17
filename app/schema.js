import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLObjectType,
	GraphQLSchema
} from "graphql";
import UserQueries from "./models/user/schema.js";
import ForgetPasswordSchema from "./models/forgetPassword/schema.js";
import DB from "./database.js"


const Queries = new GraphQLObjectType({
	name: "Query",
	description: "Root query object",
	fields() {
		return {
			...UserQueries
		}
	}
});

const Mutations = new GraphQLObjectType({
	name: 'Mutations',
	description: 'All mutations',
	fields() {

	}
})

const MainSchema = new GraphQLSchema({
  query: Queries,
  mutations: Mutations
});



export default MainSchema;