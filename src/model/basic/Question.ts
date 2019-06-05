import {Entity, ChildEntity, TableInheritance, PrimaryGeneratedColumn, Column, PrimaryColumn} from 'typeorm';
import { Content } from './Content';

// @ChildEntity()
@Entity( 'content')
export class Question extends Content {

    @PrimaryColumn()
    type: string='Question';

    @Column({
        nullable: true
    })
    answersCount: number;

}
