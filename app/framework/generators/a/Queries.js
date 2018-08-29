import {
	GraphQLList,
	GraphQLInt,
	GraphQLString
} from "graphql";
import ArticlesMainSchema from "./schema.js";
import ArticlesController from "./Controller.js"


const ArticlesQueries = {
	ArticlesView: {
		type: ArticlesMainSchema,
		args: {
		},
		async resolve(_, args) {

		}

	},
	ArticlesViewAll: {
		type: ArticlesMainSchema,
		args: {
			page: {},
			limit: {}
		},
		async resolve(_, args) {

		}
	},
}

export default ArticlesQueries;