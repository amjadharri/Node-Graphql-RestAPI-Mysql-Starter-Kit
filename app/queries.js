import {
	GraphQLObjectType
} from 'graphql';

import UserQueries from "./modules/User/Queries.js";

const Queries = new GraphQLObjectType({
	name: "Query",
	description: "Root query object",
	fields() {
		return {
			...UserQueries,
		}
	}
});

export default Queries;