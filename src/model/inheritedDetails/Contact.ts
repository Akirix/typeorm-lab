/**
 * @module models
 */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Name from './Name';
import Phone from './Phone';
import Email from './Email';

@Entity({
    name: 'contact'
})
export default class Contact {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: "varchar",
        name: "type",
        default: 'person'
    })
    public type: string;


    @Column(
        () => Name,
        {
            prefix: false
        }
    )
    public name: Name;

    @OneToMany(
        () => Phone,
        ( phone: Phone ) => phone.contact,
        {
            cascade: true
        }
    )
    public phones: Phone[];

    @OneToMany(
        () => Email,
        ( email: Email ) => email.contact,
        {
            cascade: true
        }
    )
    public emails: Email[];

}
