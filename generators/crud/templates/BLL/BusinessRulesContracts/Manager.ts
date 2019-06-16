import { NestJSEntityName } from "../BusinessEntities/NestJSModuleNameBusinessEntitiesModule";
import { NestJSPluralEntityNameLoader } from "./NestJSPluralEntityNameLoader";

export abstract class NestJSPluralEntityNameManager extends NestJSPluralEntityNameLoader {
    public abstract async Create(entity: NestJSEntityName): Promise<NestJSEntityName>;
    public abstract async Update(entity: NestJSEntityName): Promise<NestJSEntityName>;
    public abstract async Delete(entity: NestJSEntityName): Promise<void>;
}

