import {Entity, ChildEntity, TableInheritance, PrimaryColumn, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
// @TableInheritance({ column: { type: "varchar", name: "type" } })
export class Content {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn()
    type: string;

    @Column()
    title: string;

    @Column()
    description: string;

}
