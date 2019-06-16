import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";
import { DateTransformer } from "../../../../Common/Infrastructure/CommonInfrastructureModule";

@Entity("NestJSEntityName")
export class NestJSEntityName {
    @ObjectIdColumn({ type: String })
    // tslint:disable-next-line:variable-name
    public _id: string;

    @CreateDateColumn({ type: Date, transformer: DateTransformer })
    public CreationDate: Date;

    @UpdateDateColumn({ type: Date, transformer: DateTransformer })
    public UpdateDate: Date;
}
