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
            message: 'Please enter the table fields in this format name:string, age: number: (lowercase)',
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
                    path: './a/Controller.js',
                    templateFile: './modules/templates/Controller.hbs',
                });
            }
            if (data.name) {
                actions.push({
                    type: 'add',
                    path: './a/{{controllerName name}}.js',
                    templateFile: './modules/templates/Model.hbs',
                });
            }
            if (data.name) {
                actions.push({
                    type: 'add',
                    path: './a/Queries.js',
                    templateFile: './modules/templates/Queries.hbs',
                });
            }
            if (data.name) {
                actions.push({
                    type: 'add',
                    path: './a/Mutations.js',
                    templateFile: './modules/templates/Mutations.hbs',
                });
            }
            if (data.name) {
                actions.push({
                    type: 'add',
                    path: './a/Schema.js',
                    templateFile: './modules/templates/Schema.hbs',
                });
            }
            return actions;
        }else {
            console.log("require all fields");
            process.exit();
        }
    },
};
