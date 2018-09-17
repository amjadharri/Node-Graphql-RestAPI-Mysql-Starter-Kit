import { getTableFieldsInArray, splitFieldAndType } from "./schemaFields";
import { renderGraphqlType } from "./schemaFields.js";
export default function (value) {
  let array = getTableFieldsInArray(value);
  let output = "";
  array.map((e) => {
    let {columnName, columnType} = splitFieldAndType(e);
    output = output + `

  ${columnName}: {
    type: ${renderGraphqlType(columnType)}
  },

    `
  });
  return output;
}