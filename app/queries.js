import {
	GraphQLObjectType
} from 'graphql';

import UserQueries from "./modules/User/Queries.js";
import ForgetPasswordQueries from "./modules/ForgetPassword/Queries.js";

const Queries = new GraphQLObjectType({
	name: "Query",
	description: "Root query object",
	fields() {
		return {
			...UserQueries,
			...ForgetPasswordQueries,
		}
	}
});

export default Queries;