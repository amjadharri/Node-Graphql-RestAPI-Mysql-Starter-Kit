// include other modules
// import other models here and make relations
export default function makeRelations(DB, initialModels) {
	let {UserModel, ForgetPasswordModel} = initialModels;

	// user
	UserModel.hasMany(ForgetPasswordModel);
	ForgetPasswordModel.belongsTo(UserModel);

	// 

}