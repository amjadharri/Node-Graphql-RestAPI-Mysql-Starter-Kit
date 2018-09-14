import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQString,
} from "graphql";


export default new GraphQLObjectType({
	name: 'ForgetPasswordSchema',
	description: 'Graphql support for forgetPassword',
	fields() {
		return {

			successMessage: {
				type: GraphQLString,
				resolve(model) {
					return model.successMessage || '';
				}
			},
			successMessageType: {
				type: GraphQLString,
				resolve(model) {
					return model.successMessageType || '';
				}
			},
			errorMessage: {
				type: GraphQLString,
				resolve(user) {
					return user.errorMessage || '';
				}
			},
			
			errorMessageType: {
				type: GraphQLString,
				resolve(user) {
					return user.errorMessageType || '';
				}
			},
			
			id: {
				type: GraphQLInt,
				resolve(forgetPassword) {
					return forgetPassword.id;
				}
			},
			userId: {
				type: GraphQString,
				resolve(forgetPassword) {
					return forgetPassword.userId;
				}
			},
			expireDate: {
				type: GraphQString,
				resolve(forgetPassword) {
					return forgetPassword.expireDate;
				}
			},
			token: {
				type: GraphQString,
				resolve(forgetPassword) {
					return forgetPassword.token;
				}
			},
			createdAt: {
				type: GraphQLString,
				resolve(forgetPassword) {
					return forgetPassword.createdAt;
				} 
			},
			updatedAt: {
				type: GraphQLString,
				resolve(forgetPassword) {
					return forgetPassword.updatedAt;
				} 
			}
		}
	}
})