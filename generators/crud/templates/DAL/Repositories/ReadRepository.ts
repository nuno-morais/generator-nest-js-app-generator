import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { QueryOptions, ReadRepositoryBase }
    from "../../../../Common/Infrastructure/CommonInfrastructureModule";
import { NestJSEntityNameDbEntity } from "../DataAccess/NestJSModuleNameDataAccessModule";
import { NestJSPluralEntityNameConverter } from "./Converters/NestJSPluralEntityNameConverter";
import { NestJSEntityName } from "../../BLL/BusinessEntities/NestJSModuleNameBusinessEntitiesModule";
import { NestJSPluralEntityNameReadRepository as NestJSPluralEntityNameReadRepositoryContract }
    from "./../../BLL/RepositoriesContracts/NestJSModuleNameRepositoriesContractsModule";

@Injectable()
export class NestJSPluralEntityNameReadRepository extends ReadRepositoryBase<NestJSEntityNameDbEntity>
    implements NestJSPluralEntityNameReadRepositoryContract {

    public constructor(
        @InjectRepository(NestJSEntityNameDbEntity)
        internalRepository: MongoRepository<NestJSEntityNameDbEntity>,
        private converter: NestJSPluralEntityNameConverter) {
        super(internalRepository);
    }

    public async GetAllNestJSPluralEntityName(queryOptions: QueryOptions): Promise<Array<NestJSEntityName>> {
        let dbEntities: Array<NestJSEntityNameDbEntity> = await this.GetAll(null, queryOptions);
        let entities: Array<NestJSEntityName> = this.converter.ConvertToBusinessEntities(dbEntities);
        return entities;
    }

    public async GetAllByUserId(userId: string, queryOptions: QueryOptions): Promise<Array<NestJSEntityName>> {
        let dbEntities: Array<NestJSEntityNameDbEntity> = await this.GetAll({ where: { UserId: userId } }, queryOptions);
        let entities: Array<NestJSEntityName> = this.converter.ConvertToBusinessEntities(dbEntities);
        return entities;
    }

    public async GetById(id: string): Promise<NestJSEntityName> {
        const entity = await this.GetSingle({ where: { _id: id } });
        return this.converter.ConvertToBusinessEntity(entity);
    }
}
