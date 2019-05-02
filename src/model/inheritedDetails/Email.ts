import {ChildEntity, ManyToOne, JoinColumn} from 'typeorm';
import ContactDetail from "./ContactDetail";
import Contact from './Contact';

@ChildEntity('email')
export default class Email extends ContactDetail {

    @ManyToOne(
        () => Contact,
        (contact: Contact) => contact.emails,
        {
            primary: true
        }
    )
    @JoinColumn({
        name: 'contact_id'
    })
    public contact: Contact;
}