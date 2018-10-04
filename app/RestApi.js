// include all routes here
import UserRestApi from './modules/User/RestApi.js';
import ForgetPasswordRestApi from './modules/ForgetPassword/RestApi.js';
export default function (app) {
  app.post("/login", UserRestApi.login);
  app.post("/signup", UserRestApi.signup);
  app.get("/userview/:id", UserRestApi.userView);
  app.post("/change-password", UserRestApi.changePassword);
  app.post("/update-profile", UserRestApi.updateProfile);
  app.post("/request-password-reset-token", ForgetPasswordRestApi.requestPasswordResetToken);
  app.post("/reset-password", ForgetPasswordRestApi.resetPassword);
}