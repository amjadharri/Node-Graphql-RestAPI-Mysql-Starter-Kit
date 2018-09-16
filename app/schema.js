import {GraphQLSchema} from "graphql";
import Queries from "./queries.js";
import Mutations from "./mutations.js";
const MainSchema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
});
export default MainSchema;