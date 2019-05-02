import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import Person from "./Person";
import Company from "./Company";

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
     * Basically this is the issue I was looking for. Unfortunately the 
     * `type` parameter is undefined and there is still no way to get the 
     * type which extends the Contact. 
     */
    @ManyToOne(
        (type) => {
            console.log('The type is ' + type);
            return (type === 'person') ? Person : Company;
        },
        (contact: Person | Company) => contact.details,
        {
            primary: true
        }
    )
    @JoinColumn({
        name: 'contact_id'
    })
    public contact: Person | Company;

}