import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Name from './Name';
import ContactDetail from './ContactDetail';


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
        () => ContactDetail,
        ( detail: ContactDetail ) => detail.contact,
        {
            cascade: true
        }
    )
    public details: ContactDetail[];

}
