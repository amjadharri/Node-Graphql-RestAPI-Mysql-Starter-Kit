import moduleGenerator from './modules/index';
// helpers
import renderModelColumns from "./helpers/renderModelColumns"
import schemaFields from "./helpers/schemaFields"
import controllerName from "./helpers/controllerName";
import validations from "./helpers/validations";
import queriesMutationsArguments from "./helpers/queriesMutationsArguments";
import queryParams from "./helpers/queryParams";
import toLowerCase from "./helpers/toLowerCase";
// helpers


module.exports = function (plop) {
	plop.setGenerator('module', moduleGenerator);
	plop.addHelper('controllerName', controllerName);
	plop.addHelper('renderModelColumns',renderModelColumns);
	plop.addHelper('schemaFields',schemaFields);
	plop.addHelper('validations',validations);
	plop.addHelper('queriesMutationsArguments', queriesMutationsArguments);
	plop.addHelper('queryParams', queryParams);
	plop.addHelper('toLowerCase', toLowerCase);
}