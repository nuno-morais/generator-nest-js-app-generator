import { IEntity } from "../../../../Common/Infrastructure/CommonInfrastructureModule";

export class NestJSEntityName implements IEntity {
    public Id: string;
    public CreationDate: Date;
    public UpdateDate: Date;
}
