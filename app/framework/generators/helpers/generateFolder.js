
const fs = require('fs');
const path = require('path');
let back = "./../../../"


export default function (dir) {
  try {
    fs.mkdirSync(
      path.join(__dirname, `${back}/modules/${dir}`)
    );
    return path.join(__dirname, `${back}/modules/${dir}`);
  } catch (e) {
    return e
  }
}