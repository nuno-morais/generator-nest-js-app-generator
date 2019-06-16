import { Module } from "@nestjs/common";
import { NestJSModuleNameRepositoriesModule } from "../../DAL/Repositories/NestJSModuleNameRepositoriesModule";

@Module({
    components: [
    ],
    exports: [
    ],
    imports: [
        NestJSModuleNameRepositoriesModule
    ]
})
export class NestJSModuleNameBusinessRulesModule { }
