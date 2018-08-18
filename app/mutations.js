import {
	GraphQLObjectType
} from 'graphql';

import UserMutations from "./models/user/mutations.js"

const Mutations = new GraphQLObjectType({
	name: 'Mutations',
	description: 'All mutations',
	fields() {
		return {
			...UserMutations
		}
	}
})

export default Mutations;