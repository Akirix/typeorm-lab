import {
    Entity,
    ManyToOne,
    ChildEntity,
    TableInheritance,
    PrimaryGeneratedColumn,
    JoinColumn,
    Column,
    PrimaryColumn
} from 'typeorm';
import { Content } from './Content';
import { User } from './User';

// @ChildEntity('photo')
@Entity( 'content')
export class Photo extends Content {

    @PrimaryColumn()
    type: string='Photo';

    @Column({
        nullable: true
    })
    size: string;

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
