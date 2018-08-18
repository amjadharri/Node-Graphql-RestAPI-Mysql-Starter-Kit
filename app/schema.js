import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLObjectType,
	GraphQLSchema
} from "graphql";
import UserQueries from "./models/user/queries.js";
import ForgetPasswordSchema from "./models/forgetPassword/schema.js";
import DB from "./database.js";
import Queries from "./queries.js";
import Mutations from "./mutations.js";

const MainSchema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
});

export default MainSchema;