import { QueryOptions } from "../../../../Common/Infrastructure/CommonInfrastructureModule";
import { NestJSEntityName } from "../BusinessEntities/NestJSModuleNameBusinessEntitiesModule";

export abstract class NestJSPluralEntityNameReadRepository {
    public abstract async GetAllNestJSPluralEntityName(queryOptions: QueryOptions): Promise<Array<NestJSEntityName>>;
    public abstract async GetAllByUserId(userId: string, queryOptions: QueryOptions): Promise<Array<NestJSEntityName>>;
    public abstract async GetById(id: string): Promise<NestJSEntityName>;
}
