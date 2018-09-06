export default function (value) {
  let array = value.split(",");
  let output = "";
  array.map((e) => {
    let split = e.split(":");
    let columnName = split[0];
    output = output + `
  // ${columnName}: put your validations here`;
  });
  return output;
}