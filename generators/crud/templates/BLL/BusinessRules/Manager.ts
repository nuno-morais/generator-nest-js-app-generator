import { Injectable } from "@nestjs/common";
import { QueryOptions } from "../../../../Common/Infrastructure/CommonInfrastructureModule";
import { NestJSEntityName } from "../BusinessEntities/NestJSModuleNameBusinessEntitiesModule";
import {
    NestJSPluralEntityNameManager as NestJSPluralEntityNameManagerContract,
    NestJSPluralEntityNameLoader as NestJSPluralEntityNameLoaderContract
}
    from "./../BusinessRulesContracts/NestJSModuleNameBusinessRulesContractsModule";
import { NestJSPluralEntityNameRepository } from "./../RepositoriesContracts/NestJSModuleNameRepositoriesContractsModule";

@Injectable()
export class NestJSPluralEntityNameManager extends NestJSPluralEntityNameManagerContract {
    public constructor(
        private readonly repository: NestJSPluralEntityNameRepository,
        private readonly loader: NestJSPluralEntityNameLoaderContract
    ) {
        super();
    }

    public async GetAll(queryOptions: QueryOptions): Promise<Array<NestJSEntityName>> {
        return await this.loader.GetAll(queryOptions);
    }

    public async GetAllByUserId(userId: string, queryOptions: QueryOptions): Promise<Array<NestJSEntityName>> {
        return await this.loader.GetAllByUserId(userId, queryOptions);
    }

    public async GetById(id: string): Promise<NestJSEntityName> {
        return await this.loader.GetById(id);
    }

    public async Create(entity: NestJSEntityName): Promise<NestJSEntityName> {
        return await this.repository.Create(entity);
    }

    public async Update(entity: NestJSEntityName): Promise<NestJSEntityName> {
        return await this.repository.Update(entity);
    }

    public async Delete(entity: NestJSEntityName): Promise<void> {
        await this.repository.Delete(entity);
    }
}
