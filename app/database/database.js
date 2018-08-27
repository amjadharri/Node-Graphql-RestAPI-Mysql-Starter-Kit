import Sequelize from "sequelize";
import user from "./../modules/user/user"
import forgetPassword from "./../modules/forgetPassword/forgetPassword";
import seeds from "./../seeds.js";
import makeRelations from "./relations.js";
const {
	APP__DB_USERNAME,
	APP__DB_PASSWORD,
	APP__DB_NAME,
	APP__DB_DIALECT,
	APP__DB_HOST,
	APP__DB_FORCE_SYNC,
	APP__RUN_SEEDS
} = process.env;

const DB = new Sequelize(APP__DB_NAME,APP__DB_USERNAME,APP__DB_PASSWORD,{
	dialect: 'mysql',
	host: APP__DB_HOST
});

const UserModel = DB.define('user',user);
const ForgetPasswordModel = DB.define('forgetPassword',forgetPassword);

// Relations
UserModel.hasMany(ForgetPasswordModel);
ForgetPasswordModel.belongsTo(UserModel);

makeRelations();


DB.sync({
	force: (APP__DB_FORCE_SYNC == 'TRUE') ? true : false
}).then(() => {
	if (APP__RUN_SEEDS.toLowerCase() == 'true') {
		seeds();
	}
});

export default DB;
export let userModel = UserModel;
export let forgetPasswordModel = ForgetPasswordModel;