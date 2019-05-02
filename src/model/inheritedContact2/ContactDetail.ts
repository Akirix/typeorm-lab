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

    /**
     * Basically this is the issue I was looking for. 
     * There is no way to reference the type of the One side
     * when it is abstract and extended. This basically can't 
     * be type Contact because it should be Person or Company
     */
    @ManyToOne(
        () => Contact,
        (contact: Contact) => contact.details,
        {
            primary: true
        }
    )
    @JoinColumn({
        name: 'contact_id'
    })
    public contact: Contact;

}