import {Entity, ChildEntity, TableInheritance, PrimaryColumn, Column} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type", primary: true } })
export class Content {

    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

}
