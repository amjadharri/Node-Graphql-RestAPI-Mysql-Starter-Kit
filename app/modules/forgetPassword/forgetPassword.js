import Sequelize from "sequelize";


export default {
	token: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	expireDate: {
		type: Sequelize.STRING,
		allowNull: false
	}
}