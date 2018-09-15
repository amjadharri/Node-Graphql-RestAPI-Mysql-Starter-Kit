import {
	GraphQLObjectType
} from 'graphql';

import UserMutations from "./modules/user/mutations.js"
import ForgetPasswordMutations from "./modules/forgetPassword/mutations.js"

const Mutations = new GraphQLObjectType({
	name: 'Mutations',
	description: 'All mutations',
	fields() {
		return {
			...UserMutations,
			...ForgetPasswordMutations,
		}
	}
})

export default Mutations;