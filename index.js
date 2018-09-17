import cors from 'cors';
import Express from "express";
import GraphHTTP from 'express-graphql';
import Schema from './app/schema.js';
import UserController from "./app/modules/user/Controller.js"
import FogetPasswordController from "./app/modules/forgetPassword/Controller.js"

const app = Express();
const {
  APP__PORT
} = process.env;

app.use(cors());
app.use(Express.json());

app.post("/auth/login", (req, res, next) => {

});
app.post("/auth/signup", (req, res, next) => {

});
app.post("/forget-password/request-password-reset-token", (req, res, next) => {

});
app.post("/forget-password/reset-password", (req, res, next) => {

});
app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
}));

app.listen(APP__PORT, () => console.log("app listening on port "+APP__PORT));