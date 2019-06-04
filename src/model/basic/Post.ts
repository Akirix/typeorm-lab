import { Entity, ChildEntity, TableInheritance, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Content } from './Content';

@ChildEntity()
export class Post extends Content {

    @Column()
    viewCount: number;

}
