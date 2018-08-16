import Sequelize from "sequelize";


export default {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: true,
		isEmail: true,
	},
	gender: {
		type: Sequelize.STRING,
		allowNull: true
	}
}