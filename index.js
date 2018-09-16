import Express from "express";
const app = Express();
import GraphHTTP from 'express-graphql';
import Schema from './app/schema.js';
const {
	APP__PORT
} = process.env;
app.use(Express.json());
app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
}));
app.listen(APP__PORT, () => console.log("app listening on port "+APP__PORT));
