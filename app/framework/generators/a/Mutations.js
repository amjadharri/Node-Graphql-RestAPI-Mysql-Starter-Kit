import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull
} from "graphql";
import ArticlesMainSchema from "./schema.js";
import DB from "./../../database/database.js";
import ArticlesController from "./Controller.js"


const ArticlesMutations  = {
	ArticlesUpdate: {
		type: ArticlesMainSchema,
		args: {
			id: {
				type: new GraphQLNonNull(GraphQLInt)
			},
		},
		async resolve(_, args) {

		}
	},
	ArticlesCreate: {
		type: ArticlesMainSchema,
		args: {

		},
		async resolve(_, args) {

		}
	},
	ArticlesDelete: {
		type: ArticlesMainSchema,
		args: {
			id: {
				type: new GraphQLNonNull(GraphQLInt)
			},
		},
		async resolve(_, args) {

		}
	},
}


export default ArticlesMutations;