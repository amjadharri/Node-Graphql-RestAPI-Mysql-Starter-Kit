import DB from "./../../database/database.js";

class ArticlesController {
	constructor() {
		// constructor method
	}
	ArticlesViewAll(_, args) {
		try {

		} catch (e) {
			return {
				errorMessageType: 'Backend Error',
				errorMessage: `Something went wrong, ${e.message}`
			}
		}
	}

	async ArticlesCreate(_, args) {
		try {
			return DB.models.Articles.create(args);
		} catch (e) {
			return {
				errorMessageType: 'Backend Error',
				errorMessage: `Something went wrong, ${e.message}`
			}
		}
	}

	ArticlesUpdate(_, args) {
		try {

		} catch (e) {
			return {
				errorMessageType: 'Backend Error',
				errorMessage: `Something went wrong, ${e.message}`
			}
		}
	}

	ArticlesView(_, args) {
		try {

		} catch (e) {
			return {
				errorMessageType: 'Backend Error',
				errorMessage: `Something went wrong, ${e.message}`
			}
		}
	}
}


export default new ArticlesController