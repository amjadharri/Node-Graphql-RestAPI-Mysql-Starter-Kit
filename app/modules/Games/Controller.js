import DB from "./../../database/database.js";

class GamesController {
	constructor() {
		// constructor method
	}
	async GamesViewAll(_, args) {
		try {
			return DB.models.Games.findAll({
				where: args
			})
		} catch (e) {
			return {
				errorMessageType: 'Backend Error',
				errorMessage: `Something went wrong, ${e.message}`
			}
		}
	}

	async GamesCreate(_, args) {
		try {
			try {
				return DB.models.Games.create(args);
			}catch (e) {
				return {
					errorMessageType: 'Backend Error',
					errorMessage: `Something went wrong while creating Games, ${e.message}`
				}
			}
		} catch (e) {
			return {
				errorMessageType: 'Backend Error',
				errorMessage: `Something went wrong, ${e.message}`
			}
		}
	}

	async GamesUpdate(_, args) {
		try {

		} catch (e) {
			return {
				errorMessageType: 'Backend Error',
				errorMessage: `Something went wrong, ${e.message}`
			}
		}
	}

	async GamesDelete(_, args) {
		try {

		} catch (e) {
			return {
				errorMessageType: 'Backend Error',
				errorMessage: `Something went wrong, ${e.message}`
			}
		}
	}

	async GamesView(_, args) {
		try {

		} catch (e) {
			return {
				errorMessageType: 'Backend Error',
				errorMessage: `Something went wrong, ${e.message}`
			}
		}
	}
}


export default new GamesController