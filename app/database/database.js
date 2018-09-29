import Sequelize from "sequelize";
import seeds from "./../seeds.js";
import makeRelations from "./relations.js";

import user from "../modules/user/User.js"
import forgetPassword from "../modules/forgetPassword/ForgetPassword.js";



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

makeRelations(DB,{
	UserModel,
	ForgetPasswordModel
});


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