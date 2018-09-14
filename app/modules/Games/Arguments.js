import {GraphQLNonNull, GraphQLString} from 'graphql';
export default {
  

  s: {
    type: new GraphQLNonNull(GraphQLString)
  },

    

  a: {
    type: new GraphQLNonNull(GraphQLString)
  },

    
}
export let QueryParams = {
  

  s: {
    type: GraphQLString
  },

    

  a: {
    type: GraphQLString
  },

    	
}