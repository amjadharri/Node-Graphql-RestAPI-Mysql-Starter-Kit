export default function (name) {
  let supportedTypes = ['STRING', 'BOOLEAN', 'TEXT', 'JSON', 'JSONB', 'GEOMETRY', 'DATE',
    'ARRAY', 'DECIMAL', 'DOUBLE', 'INTEGER'];
  let array = name.split(",");
  let output = "";
  array.map((a) => {

    let split = a.split(":");
    let columnName = split[0];
    let columnType = split[1].toUpperCase();
    if (supportedTypes.indexOf(columnType) > -1) {
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