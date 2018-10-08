import generateFolder from "./../helpers/generateFolder.js";
import folderExists from "./../helpers/folderExists.js";
import controllerName from "./../helpers/controllerName";

module.exports = {
    description: 'Create modules for Node JS Graphql MySQL',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the module name, this includes name of Model,Table,schemaName and Controller Name (lowercase):',
        },
        {
            type: 'input',
            name: 'tableFields',
            message: `Please enter the table fields with space provided: (lowercase). 
Supported types are: 
    STRING, BOOLEAN, TEXT,  JSON,    JSONB,  GEOMETRY, DATE, 
    ARRAY(PostgreSQL ONLY), DECIMAL, DOUBLE, INTEGER
Example: name:string age: integer
`,
        }
    ],
    actions: (data) => {
        if (folderExists(data.name)) {
            console.log("Folder already exists. Sorry please try again. exiting process");
            process.exit();
        }
        let actions = [];
        if (data.name && data.tableFields) {
            if (data.name) {
                actions.push({
                    type: 'add',
                    path: `./../..//modules/${data.name}/Controller.js`,
                    templateFile: './modules/templates/Controller.hbs',
                });
                actions.push({
                    type: 'add',
                    path: `./../..//modules/${data.name}/{{controllerName name}}.js`,
                    templateFile: './modules/templates/Model.hbs',
                });
                actions.push({
                    type: 'add',
                    path: `./../..//modules/${data.name}/Queries.js`,
                    templateFile: './modules/templates/Queries.hbs',
                });
                actions.push({
                    type: 'add',
                    path: `./../..//modules/${data.name}/Mutations.js`,
                    templateFile: './modules/templates/Mutations.hbs',
                });
                actions.push({
                    type: 'add',
                    path: `./../..//modules/${data.name}/Schema.js`,
                    templateFile: './modules/templates/Schema.hbs',
                });
                actions.push({
                    type: 'add',
                    path: `./../..//modules/${data.name}/Arguments.js`,
                    templateFile: './modules/templates/Arguments.hbs',
                });
                actions.push({
                    type: 'add',
                    path: `./../..//modules/${data.name}/RestApi.js`,
                    templateFile: './modules/templates/RestApi.hbs',
                });
            }
            generateFolder(controllerName(data.name));
            return actions;
        }else {
            console.log("require all fields");
            process.exit();
        }
    },
};
