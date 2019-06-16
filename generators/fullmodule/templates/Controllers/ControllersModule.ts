import { MiddlewaresConsumer, Module, NestModule } from "@nestjs/common";
import { AuthenticationPassportMiddleware, CoreDomainModule } from "../../../Core/Domain/CoreDomainModule";
import { NestJSModuleNameBusinessRulesModule } from "../BLL/BusinessRules/NestJSModuleNameBusinessRulesModule";
import { CoreInfrastructureModule } from "../../../Core/Infrastructure/CoreInfrastructureModule";

const controllers = [
];

@Module({
    components: [
        CoreInfrastructureModule.DefaultAuthenticationEncryptor(),
    ],
    controllers: [
        ...controllers
    ],
    exports: [
    ],
    imports: [
        CoreDomainModule,
        NestJSModuleNameBusinessRulesModule
    ]
})
export class NestJSModuleNameControllersModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer): void {
        consumer.apply(AuthenticationPassportMiddleware).forRoutes(...controllers);
    }
}
