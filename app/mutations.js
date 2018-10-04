import {
	GraphQLObjectType
} from 'graphql';

import UserMutations from "./modules/User/Mutations.js";
import ForgetPasswordMutations from "./modules/ForgetPassword/Mutations.js";


import {mutations} from "./customQueriesMutations";
console.log(mutations)


const Mutations = new GraphQLObjectType({
	name: 'Mutations',
	description: 'All mutations',
	fields() {
		return {
			...UserMutations,
			...ForgetPasswordMutations,
			...mutations
		}
	}
})

export default Mutations;