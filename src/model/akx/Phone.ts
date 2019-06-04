/**
 * @module models
 */
import {ChildEntity, ManyToOne, JoinColumn, Column} from 'typeorm';
import ContactDetail, { DetailTypes } from "./ContactDetail";
import Contact, {ContactTypes} from './Contact';

/**
 * A concrete extension, aka `ChildEntity`, of the abstract [[ContactDetail]]. A fully
 * use-able class to store and categorize a phone number.
 */
@ChildEntity(DetailTypes.PHONE)
export default class Phone extends ContactDetail<string> {

    public readonly type: DetailTypes = DetailTypes.PHONE;

    /**
     * The actual valid phone number value of the phone detail.
     */
    @Column({
        type: 'varchar'
    })
    public value: string;

    /**
     * The user who owns this list of phone number. This is only here
     * because type requires the two way reference for now.
     */
    @ManyToOne(
        () => Contact,
        (contact: Contact) => contact.phones,
        {
            primary: true
        }
    )
    @JoinColumn([
        {
            name: 'contact_id',
            referencedColumnName: 'id'
        },
        {
            name: 'contact_type',
            referencedColumnName: 'type'
        }
    ])
    public contact: Contact;
}
