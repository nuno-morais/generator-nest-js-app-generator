import { Module } from "@nestjs/common";
import { NestJSModuleNameBusinessRulesModule } from "./BLL/BusinessRules/NestJSModuleNameBusinessRulesModule";
import { NestJSModuleNameControllersModule } from "./Controllers/NestJSModuleNameControllersModule";
import { NestJSModuleNameRepositoriesModule } from "./DAL/Repositories/NestJSModuleNameRepositoriesModule";

@Module({
    exports: [
        NestJSModuleNameBusinessRulesModule,
        NestJSModuleNameControllersModule,
        NestJSModuleNameRepositoriesModule
    ],
    imports: [
        NestJSModuleNameBusinessRulesModule,
        NestJSModuleNameControllersModule,
        NestJSModuleNameRepositoriesModule
    ]
})
export class NestJSModuleNameModule { }
