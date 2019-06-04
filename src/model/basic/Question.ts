import { Entity, ChildEntity, TableInheritance, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Content } from './Content';

@ChildEntity()
export class Question extends Content {

    @Column()
    answersCount: number;

}
