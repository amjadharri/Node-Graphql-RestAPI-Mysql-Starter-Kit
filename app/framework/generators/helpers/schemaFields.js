let graphlStringTypes = ['GraphqlString'];
let graphqlIntegerTypes = ['GraphqlInt', 'GraphqlID'];


export function renderGraphqlType(columnType) {
  let stringTypes = ['string','text'];
  if (stringTypes.indexOf(columnType) > -1) {
    return 'GraphQLString'
  }else {
    return 'GraphQLInt'
  }
}

export default function (value) {
  let array = value.split(",");
  let output = "";
  array.map((e) => {
    let split = e.split(":");
    let columnName = split[0];
    let columnType = split[1].toLowerCase();
    output = output + `
			${columnName}: {
				type: ${renderGraphqlType(columnType)},
				resolve(model) {
					return model.${columnName}
				}
			},
			`
  });
  return output;
}