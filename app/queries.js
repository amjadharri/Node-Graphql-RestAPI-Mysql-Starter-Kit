import {
	GraphQLObjectType
} from 'graphql';

import UserQueries from "./models/user/queries.js";

const Queries = new GraphQLObjectType({
	name: "Query",
	description: "Root query object",
	fields() {
		return {
			...UserQueries
		}
	}
});

export default Queries;