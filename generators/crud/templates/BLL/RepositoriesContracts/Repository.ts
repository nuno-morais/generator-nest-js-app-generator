import { NestJSEntityName } from "../BusinessEntities/NestJSModuleNameBusinessEntitiesModule";
import { NestJSPluralEntityNameReadRepository } from "./NestJSPluralEntityNameReadRepository";

export abstract class NestJSPluralEntityNameRepository extends NestJSPluralEntityNameReadRepository {
    public abstract async Create(entity: NestJSEntityName): Promise<NestJSEntityName>;
    public abstract async Update(entity: NestJSEntityName): Promise<NestJSEntityName>;
    public abstract async Delete(entity: NestJSEntityName): Promise<void>;
}
