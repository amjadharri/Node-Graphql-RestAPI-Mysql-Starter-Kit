import cors from 'cors';
import Express from "express";
import bodyParser from "body-parser";
import GraphHTTP from 'express-graphql';
import Schema from './app/schema.js';
import UserController from "./app/modules/user/Controller.js"
import FogetPasswordController from "./app/modules/forgetPassword/Controller.js"

const app = Express();
const {
  APP__PORT
} = process.env;

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/auth/login", (req, res) => {
  UserController.login(req, res);
});
app.post("/auth/signup", (req, res, next) => {
  UserController.signup(req, res);
});
app.post("/forget-password/request-password-reset-token", (req, res) => {
  FogetPasswordController.requestPasswordResetToken(req, res);
});
app.post("/forget-password/reset-password", (req, res) => {
  FogetPasswordController.resetPassword(req, res)
});
app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
}));

app.listen(APP__PORT, () => console.log("app listening on port "+APP__PORT));