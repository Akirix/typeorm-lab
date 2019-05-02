/**
 * @module models
 */
import { Entity, Column, TableInheritance } from "typeorm";
import Contact from "./Contact";


@Entity({
    name: 'contact_detail'
})
@TableInheritance({
    column: {
        type: "varchar",
        name: "type",
        primary: true
    }
})
export default abstract class ContactDetail {

    @Column({
        primary: true
    })
    public slug: string;

    @Column({
        name: 'is_default',
        default: false
    })
    public isDefault: boolean;

    @Column()
    public value: string;

    public abstract contact: Contact;

}