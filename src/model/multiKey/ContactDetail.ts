import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import Contact from "./Contact";

@Entity({
    name: 'contact_detail'
})
export default class ContactDetail {

    @Column({
        primary: true
    })
    public slug: string;

    @Column({
        type: "varchar",
        name: "type",
        primary: true
    })
    public type: string;

    @Column({
        name: 'is_default',
        default: false
    })
    public isDefault: boolean;

    @Column()
    public value: string;

    
    @ManyToOne(
        () => Contact,
        (contact: Contact) => contact.details,
        {
            primary: true
        }
    )
    @JoinColumn([
        {
            name: 'contact_id'
        },
        {
            name: 'contact_type'
        }
    ])
    public contact: Contact;

}