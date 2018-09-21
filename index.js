import cors from 'cors';
import Express from "express";
import bodyParser from "body-parser";
import GraphQLHttp from 'express-graphql';
import Schema from './app/Schema.js';
import UserController from "./app/modules/user/Controller.js"
import FogetPasswordController from "./app/modules/forgetPassword/Controller.js"
import {validateAccessToken} from "./app/framework/validations/index.js";

const app = Express();
const {
  APP__PORT
} = process.env;


app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(validateAccessToken);

app.use('/graphql', GraphQLHttp((req, res) => {

  return {
		schema: Schema,
		pretty: true,
		graphiql: true,
  };
}));

app.listen(APP__PORT, () => console.log("app listening on port "+APP__PORT));