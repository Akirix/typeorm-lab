import {Entity, ChildEntity,PrimaryColumn, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Photo} from "./Photo";
import {Person} from "./Person";
import {Post} from "./Post";

@Entity( 'person')
export class User extends Person {
    @PrimaryColumn()
    type: string='User';

    @OneToMany(type => Photo, photo => photo.user)
    photos: Photo[];

    @OneToMany(type => Post, post => post.user)
    posts: Post[];

}
