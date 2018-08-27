import Express from "express";
import GraphHTTP from 'express-graphql';
import Schema from './app/schema.js';
const app = Express();
const {
	APP__PORT
} = process.env;
app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));
app.listen(APP__PORT, () => console.log("app listening on port "+APP__PORT))