import {
	GraphQLObjectType
} from 'graphql';

import UserMutations from "./modules/User/Mutations.js";
import ForgetPasswordMutations from "./modules/ForgetPassword/Mutations.js";

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