import {
    Body, Controller, Delete, Get, Post, Param, Put, Query, UseGuards
} from "@nestjs/common";
import { AuthorizationContextService, RolesDecorator as Roles, RolesGuard }
    from "../../../Common/Domain/CommonDomainModule";
import { QueryOptions, StringToNumberPipe, ValidationPipe }
    from "../../../Common/Infrastructure/CommonInfrastructureModule";
import { NestJSEntityName } from "../BLL/BusinessEntities/NestJSModuleNameBusinessEntitiesModule";
import { NestJSPluralEntityNameManager } from "../BLL/BusinessRulesContracts/NestJSModuleNameBusinessRulesContractsModule";

@Controller("NestJSPluralEntityName")
@UseGuards(RolesGuard)
export class NestJSPluralEntityNameController {
    public constructor(
        private readonly manager: NestJSPluralEntityNameManager,
        private readonly authorizationContextService: AuthorizationContextService) {
    }

    @Get()
    @Roles("Admin", "Patient", "Physician")
    public async GetAll(
        @Query("top", new StringToNumberPipe()) top: number,
        @Query("skip", new StringToNumberPipe()) skip: number) {
        let queryOptions: QueryOptions = new QueryOptions();
        queryOptions.Skip = skip;
        queryOptions.Top = top;
        return await this.manager.GetAll(queryOptions);
    }

    @Get(":id")
    @Roles("Admin", "Patient", "Physician")
    public async GetById(@Param("id") id: string) {
        return this.manager.GetById(id);
    }

    @Get("test")
    @Roles("Admin", "Patient", "Physician")
    public async GetAllByUserId(
        @Query("top", new StringToNumberPipe()) top: number,
        @Query("skip", new StringToNumberPipe()) skip: number) {
        let queryOptions: QueryOptions = new QueryOptions();
        queryOptions.Skip = skip;
        queryOptions.Top = top;
        const userId: string = this.authorizationContextService.AuthorizationContext.Id;
        return await this.manager.GetAllByUserId(userId, queryOptions);
    }

    @Post()
    @Roles("Admin", "Physician", "Patient")
    public async CreateNestJSEntityName(@Body(new ValidationPipe()) entity: NestJSEntityName) {
        return await this.manager.Create(entity);
    }

    @Put(":id")
    @Roles("Admin", "Physician", "Patient")
    public async PutNestJSEntityName(@Param("id") id: string,
        @Body(new ValidationPipe()) entity: NestJSEntityName) {
        entity.Id = id;
        return await this.manager.Update(entity);
    }

    @Delete(":id")
    @Roles("Admin", "Physician", "Patient")
    public async DeleteNestJSEntityName(@Param("id") id: string,
        @Body() entity: NestJSEntityName) {
        entity.Id = id;
        return await this.manager.Delete(entity);
    }
}
