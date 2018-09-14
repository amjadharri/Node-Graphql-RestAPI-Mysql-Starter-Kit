import {
	GraphQLList,
	GraphQLInt,
	GraphQLString
} from "graphql";
import GamesMainSchema from "./Schema.js";
import GamesController from "./Controller.js"


const GamesQueries = {
	GamesView: {
		type: GamesMainSchema,
		args: {
			id: {
				type: GraphQLInt
			}
		},
		async resolve(_, args) {
			return GamesController.GamesView(_, args);
		}

	},
	GamesViewAll: {
		type: new GraphQLList(GamesMainSchema),
		args: {
			id: {
				type: GraphQLInt
			},
			page: {
				type: GraphQLString
			},
			limit: {
				type: GraphQLString
			},
		},
		async resolve(_, args) {
			return GamesController.GamesViewAll(_, args);
		}
	},
}

export default GamesQueries;