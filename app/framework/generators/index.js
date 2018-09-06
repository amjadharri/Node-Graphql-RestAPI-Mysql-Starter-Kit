import moduleGenerator from './modules/index';
// helpers
import renderModelColumns from "./helpers/renderModelColumns"
import schemaFields from "./helpers/schemaFields"
import controllerName from "./helpers/controllerName";
import validations from "./helpers/validations";
import queriesMutationsArguments from "./helpers/queriesMutationsArguments";
// helpers
module.exports = function (plop) {
	plop.setGenerator('module', moduleGenerator);
	plop.addHelper('controllerName', controllerName);
	plop.addHelper('renderModelColumns',renderModelColumns)
	plop.addHelper('schemaFields',schemaFields)
	plop.addHelper('validations',validations)
	plop.addHelper('queriesMutationsArguments', queriesMutationsArguments)
}