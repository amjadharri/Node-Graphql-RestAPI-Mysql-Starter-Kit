import {
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull
} from "graphql";
import GamesMainSchema from "./schema.js";
import DB from "./../../database/database.js";
import GamesController from "./Controller.js";
import Arguments from "./Arguments.js"


const GamesMutations  = {
	GamesUpdate: {
		type: GamesMainSchema,
		args: Arguments,
		async resolve(_, args) {
			return GamesController.GamesUpdate(_, args);
		}
	},
	GamesCreate: {
		type: GamesMainSchema,
		args: Arguments,
		async resolve(_, args) {
			return GamesController.GamesCreate(_, args);
		}
	},
	GamesDelete: {
		type: GamesMainSchema,
		args: {
			id: {
				type: new GraphQLNonNull(GraphQLInt)
			},
		},
		async resolve(_, args) {
			return GamesController.GamesDelete(_, args);
		}
	},
}


export default GamesMutations;