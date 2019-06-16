import { Injectable } from "@nestjs/common";
import { DateTransformer, EntitiesConverterBase } from "../../../../../Common/Infrastructure/CommonInfrastructureModule";
import { NestJSEntityNameDbEntity } from "../../DataAccess/NestJSModuleNameDataAccessModule";
import { NestJSEntityName } from "../../../BLL/BusinessEntities/NestJSModuleNameBusinessEntitiesModule";

@Injectable()
export class NestJSPluralEntityNameConverter
    extends EntitiesConverterBase<NestJSEntityName, NestJSEntityNameDbEntity>
{
    public ConvertToBusinessEntity(dbEntity: NestJSEntityNameDbEntity): NestJSEntityName {
        let businessEntity: NestJSEntityName = new NestJSEntityName();
        businessEntity.Id = dbEntity._id;
        businessEntity.CreationDate = DateTransformer.to(dbEntity.CreationDate);
        businessEntity.UpdateDate = DateTransformer.to(dbEntity.UpdateDate);
        return businessEntity;
    }

    public ConvertToDbEntity(businessEntity: NestJSEntityName): NestJSEntityNameDbEntity {
        let dbEntity: NestJSEntityNameDbEntity = new NestJSEntityNameDbEntity();
        dbEntity._id = businessEntity.Id;
        dbEntity.CreationDate = DateTransformer.to(businessEntity.CreationDate || new Date());
        dbEntity.UpdateDate = DateTransformer.to(new Date());
        return dbEntity;
    }
}
