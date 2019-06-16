import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { WriteRepositoryBase } from "../../../../Common/Infrastructure/DAL/Repositories/WriteRepositoryBase";
import { NestJSEntityName } from "../../BLL/BusinessEntities/NestJSModuleNameBusinessEntitiesModule";
import { NestJSEntityNameDbEntity } from "./../DataAccess/NestJSModuleNameDataAccessModule";
import { NestJSPluralEntityNameConverter } from "./Converters/NestJSPluralEntityNameConverter";

@Injectable()
export class NestJSPluralEntityNameWriteRepository extends WriteRepositoryBase<NestJSEntityNameDbEntity>
{
    public constructor(
        @InjectRepository(NestJSEntityNameDbEntity)
        internalRepository: MongoRepository<NestJSEntityNameDbEntity>,
        private converter: NestJSPluralEntityNameConverter) {
        super(internalRepository);
    }

    protected GetInstanceOfDbEntity(): NestJSEntityNameDbEntity {
        return new NestJSEntityNameDbEntity();
    }

    public GetInstance(businessEntity: NestJSEntityName): NestJSEntityNameDbEntity {
        let dbEntity = this.FillDbEntity(businessEntity);
        return dbEntity;
    }

    protected FillDbEntity(businessEntity: NestJSEntityName): NestJSEntityNameDbEntity {
        let dbEntity: NestJSEntityNameDbEntity = this.converter.ConvertToDbEntity(businessEntity);
        return dbEntity;
    }
}
