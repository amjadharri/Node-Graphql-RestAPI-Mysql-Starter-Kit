import {
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} from "graphql";
import ForgetPasswordMainSchema from "./schema.js";
import ForgetPasswordController from "./Controller.js";
import forgetPassword from "./forgetPassword.js";


const ForgetPasswordMutations = {
  requestPasswordResetToken: {
    type: ForgetPasswordMainSchema,
    args: {
      email: {
        type: GraphQLString
      },
      returnUrl: {
        type: GraphQLString
      }
    },
    resolve(_, args) {
      return ForgetPasswordController.requestPasswordResetToken(_, args)
    }
  },
  resetPassword: {
    type: ForgetPasswordMainSchema,
    args: {
      token: {
        type: GraphQLString,
      },
      password: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      }
    },
    resolve(_, args) {
      return ForgetPasswordController.resetPassword(_ ,args);
    }
  }
}

export default ForgetPasswordMutations;