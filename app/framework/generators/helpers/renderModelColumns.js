import { getTableFieldsInArray, splitFieldAndType } from "./schemaFields";
export default function (name) {
  let supportedTypes = ['STRING', 'BOOLEAN', 'TEXT', 'JSON', 'JSONB', 'GEOMETRY', 'DATE',
    'ARRAY', 'DECIMAL', 'DOUBLE', 'INTEGER'];
  let array = getTableFieldsInArray(name);
  let output = "";
  array.map((a) => {
    let { columnName, columnType } = splitFieldAndType(a);
    console.log(columnName, columnType, name);
    if (supportedTypes.indexOf(columnType.toUpperCase()) > -1) {
      output = output + `
	${columnName}: {
		type: Sequelize.${columnType},
		allowNull: false,
	},
				`;
    } else {
      console.log(`Skipping ${columnName} because ${columnType} is unknown. Please add it manually.`)
    }
  })

  return output;
}