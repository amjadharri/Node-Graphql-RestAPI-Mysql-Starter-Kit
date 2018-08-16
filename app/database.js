import Sequelize from "sequelize";
import user from "./models/user/user"
import forgetPassword from "./models/forgetPassword/forgetPassword";
import seeds from "./seeds.js";
const {
	APP__DB_USERNAME,
	APP__DB_PASSWORD,
	APP__DB_NAME,
	APP__DB_DIALECT,
	APP__DB_HOST,
	APP__DB_FORCE_SYNC
} = process.env;

const DB = new Sequelize(APP__DB_NAME,APP__DB_USERNAME,APP__DB_PASSWORD,{
	dialect: APP__DB_DIALECT,
	host: APP__DB_HOST
});


const UserModel = DB.define('user',user);
const ForgetPasswordModel = DB.define('forgetPassword',forgetPassword);

// Relations
UserModel.hasMany(ForgetPasswordModel);
ForgetPasswordModel.belongsTo(UserModel);

DB.sync({
	force: (APP__DB_FORCE_SYNC == 'TRUE') ? true : false
}).then(() => {
	seeds()
});

export default DB;
export let userModel = UserModel;
export let forgetPasswordModel = ForgetPasswordModel;