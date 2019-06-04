/**
 * @module models
 */
import {ChildEntity, ManyToOne, JoinColumn, Column} from 'typeorm';
import ContactDetail, { DetailTypes } from "./ContactDetail";
import Contact from './Contact';

/**
 * A concrete extension, aka `ChildEntity`, of the abstract [[ContactDetail]]. A fully
 * use-able class to store and categorize an email address.
 */
@ChildEntity(DetailTypes.EMAIL)
export default class Email extends ContactDetail<string> {

    public readonly type: DetailTypes = DetailTypes.EMAIL;

    /**
     * The actual valid email address value of the email detail.
     */
    @Column({
        type: 'varchar'
    })
    public value: string;

    /**
     * The user who owns this list of email addresses. This is only here
     * because type requires the two way reference for now.
     */
    @ManyToOne(
        () => Contact,
        (contact: Contact) => contact.emails,
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
