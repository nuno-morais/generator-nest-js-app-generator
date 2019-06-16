var Generator = require('yeoman-generator');
var path = require('path');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('appname', { type: String, required: true });
    }

    writing() {
        const copyTo = (from, to, processContent) => {
            this.fs.copy(
                this.templatePath(from),
                this.destinationPath(to),
                {
                    process: function (content) {
                        return processContent(content);
                    }
                }
            );
        };

        const contentProcessor = (name) => {
            return (content) => {
                var regEx = new RegExp('NestJSModuleName', 'g');
                var newContent = content.toString().replace(regEx, name);
                return newContent;
            }
        }

        const copyPathTo = (originPath, fileName, moduleName, processor) => {
            const originFilePath = path.join(originPath, fileName);
            const destinationFilePath = path.join(moduleName, originPath, `${moduleName}${fileName}`);
            copyTo(originFilePath, destinationFilePath, processor)
        }

        const moduleName = this.options.appname;
        copyPathTo('BLL/BusinessEntities', 'BusinessEntitiesModule.ts', moduleName, contentProcessor(moduleName));
        copyPathTo('BLL/BusinessRules', 'BusinessRulesModule.ts', moduleName, contentProcessor(moduleName));
        copyPathTo('BLL/BusinessRulesContracts', 'BusinessRulesContractsModule.ts', moduleName, contentProcessor(moduleName));
        copyPathTo('BLL/RepositoriesContracts', 'RepositoriesContractsModule.ts', moduleName, contentProcessor(moduleName));
        copyPathTo('Controllers', 'ControllersModule.ts', moduleName, contentProcessor(moduleName));
        copyPathTo('DAL/DataAccess', 'DataAccessModule.ts', moduleName, contentProcessor(moduleName));
        copyPathTo('DAL/Repositories', 'RepositoriesModule.ts', moduleName, contentProcessor(moduleName));
        copyPathTo('', 'Module.ts', moduleName, contentProcessor(moduleName));
    }
};
