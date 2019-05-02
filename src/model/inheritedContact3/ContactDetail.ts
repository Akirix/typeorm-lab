import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import Contact from "./Contact";
import Person from "./Person";

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
     * when it is abstract and extended. This time around 
     * the type is statically set to person so it can try to
     * at tleast load people and get some kind of valid reference. 
     */
    @ManyToOne(
        () => Person,
        (contact: Person) => contact.details,
        {
            primary: true
        }
    )
    @JoinColumn({
        name: 'contact_id'
    })
    public contact: Person;

}