import generateFolder from "./../helpers/generateFolder.js";
import folderExists from "./../helpers/folderExists.js";
import controllerName from "./../helpers/controllerName";

module.exports = {
    description: 'Create modules for Node JS Graphql MySQL',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the module name (lowercase):',
        },
        {
            type: 'input',
            name: 'table',
            message: 'Please enter the table name (lowercase):',
        },
        {
            type: 'input',
            name: 'controllerName',
            message: 'Please enter the controller name (lowercase)',
        },
        {
            type: 'input',
            name: 'tableFields',
            message: `Please enter the table fields: (lowercase). 
Supported types are: 
    STRING, BOOLEAN, TEXT,  JSON,    JSONB,  GEOMETRY, DATE, 
    ARRAY(PostgreSQL ONLY), DECIMAL, DOUBLE, INTEGER
Example: name:string, age: integer
`,
        },
        {
            type: 'confirm',
            name: 'wantSeeds',
            default: false,
            message: 'Do you want to add seeds? yes/no or y/n (lowercase)'
        }
    ],
    actions: (data) => {
        let actions = [];
        if (data.name && data.table && data.tableFields && data.wantSeeds) {
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
            }
            if (folderExists(data.name)) {
                console.log("Folder already exists. Sorry please try again.");
                return [];
            }
            generateFolder(controllerName(data.name));
            return actions;
        }else {
            console.log("require all fields");
            process.exit();
        }
    },
};
