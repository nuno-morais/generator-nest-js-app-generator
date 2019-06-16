import { Injectable } from "@nestjs/common";
import { QueryOptions, RepositoryBase }
    from "../../../../Common/Infrastructure/CommonInfrastructureModule";
import { NestJSEntityName } from "../../BLL/BusinessEntities/NestJSModuleNameBusinessEntitiesModule";
import { NestJSPluralEntityNameReadRepository, NestJSPluralEntityNameRepository as NestJSPluralEntityNameRepositoryContract }
    from "./../../BLL/RepositoriesContracts/NestJSModuleNameRepositoriesContractsModule";
import { NestJSPluralEntityNameWriteRepository } from "./NestJSPluralEntityNameWriteRepository";
import { NestJSPluralEntityNameConverter } from "./Converters/NestJSPluralEntityNameConverter";

@Injectable()
export class NestJSPluralEntityNameRepository extends RepositoryBase
    implements NestJSPluralEntityNameRepositoryContract {
    public constructor(
        private readonly readRepository: NestJSPluralEntityNameReadRepository,
        private readonly repository: NestJSPluralEntityNameWriteRepository,
        private readonly converter: NestJSPluralEntityNameConverter) {
        super();
    }

    public async Create(entity: NestJSEntityName): Promise<NestJSEntityName> {
        const dbEntity = await this.repository.Add(entity);
        return this.converter.ConvertToBusinessEntity(dbEntity);
    }

    public async Update(entity: NestJSEntityName): Promise<NestJSEntityName> {
        const dbEntity = await this.repository.Update(entity);
        return this.converter.ConvertToBusinessEntity(dbEntity);
    }

    public async Delete(entity: NestJSEntityName): Promise<void> {
        await this.repository.Delete(entity);
    }

    public async GetAllNestJSPluralEntityName(queryOptions: QueryOptions): Promise<Array<NestJSEntityName>> {
        return await this.readRepository.GetAllNestJSPluralEntityName(queryOptions);
    }

    public async GetAllByUserId(userId: string, queryOptions: QueryOptions): Promise<Array<NestJSEntityName>> {
        return await this.readRepository.GetAllByUserId(userId, queryOptions);
    }

    public async GetById(id: string): Promise<NestJSEntityName> {
        return await this.readRepository.GetById(id);
    }
}
