import {
	GraphQLObjectType
} from 'graphql';

import UserMutations from "./modules/user/Mutations.js"

const Mutations = new GraphQLObjectType({
	name: 'Mutations',
	description: 'All mutations',
	fields() {
		return {
			...UserMutations,
		}
	}
})

export default Mutations;