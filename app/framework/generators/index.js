import moduleGenerator from './modules/index';
module.exports = function (plop) {
	plop.setGenerator('module', moduleGenerator);
	plop.addHelper('controllerName', function (name) {
		let firstCharacter = name[0].toUpperCase();
		let rest = name.slice(1);
		return firstCharacter+rest;
	});
}