import {Entity, ChildEntity, TableInheritance, PrimaryColumn, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Photo} from "./Photo";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type", primary: true } })
export class Contact {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Photo, photo => photo.user)
    photos: Photo[];

}
