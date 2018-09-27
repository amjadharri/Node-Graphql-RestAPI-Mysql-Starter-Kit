import {
	GraphQLObjectType
} from 'graphql';

import UserQueries from "./modules/User/Queries.js";
import ForgetPasswordQueries from "./modules/ForgetPassword/Queries.js";

import {queries} from "./customQueriesMutations";

const Queries = new GraphQLObjectType({
	name: "Query",
	description: "Root query object",
	fields() {
		return {
			...UserQueries,
			...ForgetPasswordQueries,
			...queries
		}
	}
});

export default Queries;