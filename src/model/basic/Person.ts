import {Entity, ChildEntity, TableInheritance, PrimaryColumn, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
// @TableInheritance({ column: { type: "varchar", name: "type" } })
export class Person {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @PrimaryColumn({
        default: 'User'
    })
    type: string;

}
