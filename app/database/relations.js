// import other models here and make relations
export default function makeRelations(obj) {
	let {UserModel, ForgetPasswordModel} = obj;

	// user
	UserModel.hasMany(ForgetPasswordModel);
	ForgetPasswordModel.belongsTo(UserModel);

}