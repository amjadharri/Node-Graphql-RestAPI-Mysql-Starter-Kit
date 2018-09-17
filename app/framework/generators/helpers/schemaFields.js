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

export function getTableFieldsInArray(value) {
  return value.split(" ");
}

export function splitFieldAndType(value) {
  let split = value.split(":");
  return {
    columnName: split[0].toLowerCase(),
    columnType: split[1].toLowerCase()
  }
}

export default function (value) {
  let array = getTableFieldsInArray(value);
  let output = "";
  array.map((e) => {
    let {columnName, columnType} = splitFieldAndType(e);
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