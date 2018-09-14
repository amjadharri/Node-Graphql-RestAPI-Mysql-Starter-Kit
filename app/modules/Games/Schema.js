import Joi from 'joi';
import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
} from "graphql";

import DB from "./../../database/database.js";

export let validations = Joi.object().keys({
	
  // s: put your validations here
  // a: put your validations here
});

const GamesMainSchema = new GraphQLObjectType({
	name: `GamesSchema${Math.random().toString(36).substring(2)}`,
	description: 'Graphql support for games',
	fields() {
		return {
			id: {
				type: GraphQLInt,
				resolve(model) {
					return model.id;
				}
			},
			errorMessage: {
				type: GraphQLString,
				resolve(model) {
					return model.errorMessage || '';
				}
			},
			errorMessageType: {
				type: GraphQLString,
				resolve(model) {
					return model.errorMessageType || '';
				}
			},
			
			s: {
				type: GraphQLString,
				resolve(model) {
					return model.s
				}
			},
			
			a: {
				type: GraphQLString,
				resolve(model) {
					return model.a
				}
			},
			
			createdAt: {
				type: GraphQLString,
				resolve(model) {
					return model.createdAt;
				} 
			},
			updatedAt: {
				type: GraphQLString,
				resolve(model) {
					return model.updatedAt;
				}
			},
		}
	}
})


export default GamesMainSchema