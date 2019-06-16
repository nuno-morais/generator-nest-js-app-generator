import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoreModule } from "../../../../Core/CoreModule";
import { CoreInfrastructureModule } from "../../../../Core/Infrastructure/CoreInfrastructureModule";

@Module({
    components: [
    ],
    exports: [
    ],
    imports: [
        TypeOrmModule.forFeature([]),
        CoreModule,
        CoreInfrastructureModule
    ]
})
export class NestJSModuleNameRepositoriesModule { }
