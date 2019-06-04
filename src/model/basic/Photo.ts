import { Entity, ManyToOne, ChildEntity, TableInheritance, PrimaryGeneratedColumn,JoinColumn, Column } from 'typeorm';
import { Content } from './Content';
import { User } from './User';

@ChildEntity('photo')
export class Photo extends Content {

    @Column()
    size: string;

    @ManyToOne(type => User, user => user.photos)
    @JoinColumn([
        {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    ])
    user: User;

}
