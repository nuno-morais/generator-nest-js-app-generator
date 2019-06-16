import { Injectable } from "@nestjs/common";
import { QueryOptions } from "../../../../Common/Infrastructure/CommonInfrastructureModule";
import { NestJSEntityName } from "../BusinessEntities/NestJSModuleNameBusinessEntitiesModule";
import { NestJSPluralEntityNameLoader as NestJSPluralEntityNameLoaderContract } from "./../BusinessRulesContracts/NestJSModuleNameBusinessRulesContractsModule";
import { NestJSPluralEntityNameReadRepository } from "./../RepositoriesContracts/NestJSModuleNameRepositoriesContractsModule";

@Injectable()
export class NestJSPluralEntityNameLoader extends NestJSPluralEntityNameLoaderContract {
    public constructor(
        private readonly readRepository: NestJSPluralEntityNameReadRepository
    ) {
        super();
    }

    public async GetAll(queryOptions: QueryOptions): Promise<Array<NestJSEntityName>> {
        return await this.readRepository.GetAllNestJSPluralEntityName(queryOptions);
    }

    public async GetById(id: string): Promise<NestJSEntityName> {
        return await this.readRepository.GetById(id);
    }

    public async GetAllByUserId(userId: string, queryOptions: QueryOptions): Promise<Array<NestJSEntityName>> {
        return await this.readRepository.GetAllByUserId(userId, queryOptions);
    }

}
