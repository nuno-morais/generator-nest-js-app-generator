var Generator = require('yeoman-generator');
var path = require('path');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('appname', { type: String, required: true });
    }

    async prompting() {
        this.answers = await this.prompt([
            {
                type: 'input',
                name: 'single',
                message: 'Entity Name'
            },
            {
                type: 'input',
                name: 'plural',
                message: 'Entity plural Name'
            }]);
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

        const contentProcessor = (name, pluralName, _moduleName) => {
            return (content) => {
                var regEx = new RegExp('NestJSEntityName', 'g');
                var newContent = content.toString().replace(regEx, name);


                var regEx = new RegExp('NestJSPluralEntityName', 'g');
                newContent = newContent.toString().replace(regEx, pluralName);

                var regEx = new RegExp('NestJSModuleName', 'g');
                newContent = newContent.toString().replace(regEx, _moduleName);

                return newContent;
            }
        }

        const copyPathTo = (originPath, fileName, moduleName, targetFileName, processor) => {
            const originFilePath = path.join(originPath, fileName);
            const destinationFilePath = path.join(moduleName, originPath, `${targetFileName}`);
            copyTo(originFilePath, destinationFilePath, processor)
        }

        const exportProcessor = (name, alias, path) => {
            var newContent = `export { ${name}`;
            if (alias != null) {
                newContent += ` as ${alias}`;
            }
            newContent += ` } from "${path}";\n`;
            return newContent;
        }

        const includeExport = (moduleName, originPath, targetModule, name, alias) => {
            const modulePath = path.join(moduleName, originPath, `${moduleName}${targetModule}Module.ts`);
            const data = exportProcessor(name, alias, `./${name}`);
            this.fs.append(this.destinationPath(modulePath), data);
        }

        const imp = (entityPluralName, _moduleName) => {
            const lentityPluralName = entityPluralName.charAt(0).toLowerCase() + entityPluralName.substr(1);

            console.log(`
            /** Business rules Module**/
            import
            {
                ${entityPluralName}Loader as ${entityPluralName}LoaderContract,
                ${entityPluralName}Manager as ${entityPluralName}ManagerContract
            } from "../BusinessRulesContracts/${_moduleName}BusinessRulesContractsModule";
            import { ${entityPluralName}Loader } from "./${entityPluralName}Loader";
            import { ${entityPluralName}Manager } from "./${entityPluralName}Manager";
            
            const ${lentityPluralName}LoaderProvider =
                {
                    provide: ${entityPluralName}LoaderContract,
                    useClass: ${entityPluralName}Loader
                };
            
            const ${lentityPluralName}ManagerProvider =
                {
                    provide: ${entityPluralName}ManagerContract,
                    useClass: ${entityPluralName}Manager
                };


            /** DataAccess Module**/
            import
            {
                ${entityPluralName}ReadRepository as ${entityPluralName}ReadRepositoryContract,
                ${entityPluralName}Repository as ${entityPluralName}RepositoryContract
            } from "../../BLL/RepositoriesContracts/${_moduleName}RepositoriesContractsModule";
            import { ${entityPluralName}ReadRepository } from "./${entityPluralName}ReadRepository";
            import { ${entityPluralName}Repository } from "./${entityPluralName}Repository";
            import { ${entityPluralName}WriteRepository } from "./${entityPluralName}WriteRepository";
            import { ${entityPluralName}Converter } from "./Converters/${entityPluralName}Converter";
            
            const ${lentityPluralName}ReadRepositoryProvider =
                {
                    provide: ${entityPluralName}ReadRepositoryContract,
                    useClass: ${entityPluralName}ReadRepository
                };
            
            const ${lentityPluralName}RepositoryProvider =
                {
                    provide: ${entityPluralName}RepositoryContract,
                    useClass: ${entityPluralName}Repository
                };
            `);
        }

        const moduleName = this.options.appname;
        const entityName = this.answers.single;
        const entityPluralName = this.answers.plural;
        copyPathTo('BLL/BusinessEntities', 'Entity.ts', moduleName, `${entityName}.ts`, contentProcessor(entityName, entityPluralName, moduleName));
        includeExport(moduleName, 'BLL/BusinessEntities', 'BusinessEntities', entityName, null);
        copyPathTo('BLL/BusinessRulesContracts', 'Loader.ts', moduleName, `${entityPluralName}Loader.ts`, contentProcessor(entityName, entityPluralName, moduleName));
        includeExport(moduleName, 'BLL/BusinessRulesContracts', 'BusinessRulesContracts', `${entityPluralName}Loader`, null);
        copyPathTo('BLL/BusinessRulesContracts', 'Manager.ts', moduleName, `${entityPluralName}Manager.ts`, contentProcessor(entityName, entityPluralName, moduleName));
        includeExport(moduleName, 'BLL/BusinessRulesContracts', 'BusinessRulesContracts', `${entityPluralName}Manager`, null);
        copyPathTo('BLL/RepositoriesContracts', 'ReadRepository.ts', moduleName, `${entityPluralName}ReadRepository.ts`, contentProcessor(entityName, entityPluralName, moduleName));
        includeExport(moduleName, 'BLL/RepositoriesContracts', 'RepositoriesContracts', `${entityPluralName}ReadRepository`, null);
        copyPathTo('BLL/RepositoriesContracts', 'Repository.ts', moduleName, `${entityPluralName}Repository.ts`, contentProcessor(entityName, entityPluralName, moduleName));
        includeExport(moduleName, 'BLL/RepositoriesContracts', 'RepositoriesContracts', `${entityPluralName}Repository`, null);
        copyPathTo('BLL/BusinessRules', 'Loader.ts', moduleName, `${entityPluralName}Loader.ts`, contentProcessor(entityName, entityPluralName, moduleName));
        copyPathTo('BLL/BusinessRules', 'Manager.ts', moduleName, `${entityPluralName}Manager.ts`, contentProcessor(entityName, entityPluralName, moduleName));

        copyPathTo('DAL/DataAccess', 'Entity.ts', moduleName, `${entityName}.ts`, contentProcessor(entityName, entityPluralName, moduleName));
        includeExport(moduleName, 'DAL/DataAccess', 'DataAccess', `${entityName}`, `${entityName}DbEntity`);

        copyPathTo('DAL/Repositories/Converters', 'Converter.ts', moduleName, `${entityPluralName}Converter.ts`, contentProcessor(entityName, entityPluralName, moduleName));

        copyPathTo('DAL/Repositories', 'ReadRepository.ts', moduleName, `${entityPluralName}ReadRepository.ts`, contentProcessor(entityName, entityPluralName, moduleName));
        copyPathTo('DAL/Repositories', 'Repository.ts', moduleName, `${entityPluralName}Repository.ts`, contentProcessor(entityName, entityPluralName, moduleName));
        copyPathTo('DAL/Repositories', 'WriteRepository.ts', moduleName, `${entityPluralName}WriteRepository.ts`, contentProcessor(entityName, entityPluralName, moduleName));


        copyPathTo('Controllers', 'Controller.ts', moduleName, `${entityPluralName}Controller.ts`, contentProcessor(entityName, entityPluralName, moduleName));

        imp(entityPluralName, moduleName);
    }
};
