import Joi from 'joi';
import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
} from "graphql";

import DB from "./../../database/database.js";

export let validations = Joi.object().keys({
});

const ArticlesMainSchema = new GraphQLObjectType({
	name: 'ArticlesSchema',
	description: 'Graphql support for articles',
	fields() {
		return {
			errorMessage: {
				type: GraphQLString,
				resolve(articles) {
					return articles.errorMessage || '';
				}
			},
			errorMessageType: {
				type: GraphQLString,
				resolve(articles) {
					return articles.errorMessageType || '';
				}
			},
			id: {
				type: GraphQLInt,
				resolve(articles) {
					return articles.id;
				}
			},
			createdAt: {
				type: GraphQLString,
				resolve(articles) {
					return articles.createdAt;
				} 
			},
			updatedAt: {
				type: GraphQLString,
				resolve(articles) {
					return articles.updatedAt;
				}
			},
		}
	}
})


export default UserMainSchema