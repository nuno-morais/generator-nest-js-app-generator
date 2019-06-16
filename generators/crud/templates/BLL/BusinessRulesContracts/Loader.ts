import { QueryOptions } from "../../../../Common/Infrastructure/CommonInfrastructureModule";
import { NestJSEntityName } from "../BusinessEntities/NestJSModuleNameBusinessEntitiesModule";

export abstract class NestJSPluralEntityNameLoader {
    public abstract async GetAll(queryOptions: QueryOptions): Promise<Array<NestJSEntityName>>;
    public abstract async GetAllByUserId(userId: string, queryOptions: QueryOptions): Promise<Array<NestJSEntityName>>;
    public abstract async GetById(id: string): Promise<NestJSEntityName>;
}
