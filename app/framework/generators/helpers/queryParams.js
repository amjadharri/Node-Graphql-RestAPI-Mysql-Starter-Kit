import { renderGraphqlType } from "./schemaFields.js";
export default function (value) {
  let array = value.split(",");
  let output = "";
  array.map((e) => {
    let split = e.split(":");
    let columnName = split[0];
    let columnType = split[1].toLowerCase();
    output = output + `

  ${columnName}: {
    type: ${renderGraphqlType(columnType)}
  },

    `
  });
  return output;
}