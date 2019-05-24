import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import Name from './Name';
import ContactDetail from './ContactDetail';


@Entity({
    name: 'contact'
})
export default class Contact {

    @PrimaryColumn()
    public id: number;

    @Column({
        type: "varchar",
        name: "type",
        default: 'person',
        primary: true
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
