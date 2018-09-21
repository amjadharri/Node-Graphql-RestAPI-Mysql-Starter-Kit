import {GraphQLSchema} from "graphql";
import Queries from "./Queries.js";
import Mutations from "./Mutations.js";
const MainSchema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
});
export default MainSchema;