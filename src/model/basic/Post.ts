import {
    Entity,
    ChildEntity,
    TableInheritance,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Content } from './Content';
import {User} from "./User";

// @ChildEntity()
@Entity( 'content')
export class Post extends Content {
    @PrimaryColumn()
    type: string='Post';

    @Column({
        nullable: true
    })
    viewCount: number;

    @ManyToOne(type => User, user => user.photos, {
            primary: true
        }
    )
    @JoinColumn([
        {
            name: 'person_id',
            referencedColumnName: 'id'
        },
        {
            name: 'person_type',
            referencedColumnName: 'type'
        }
    ])
    user: User;

}
