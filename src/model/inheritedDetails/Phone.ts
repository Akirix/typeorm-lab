import {ChildEntity, ManyToOne, JoinColumn} from 'typeorm';
import ContactDetail from "./ContactDetail";
import Contact from './Contact';

@ChildEntity('phone')
export default class Phone extends ContactDetail {

    @ManyToOne(
        () => Contact,
        (contact: Contact) => contact.phones,
        {
            primary: true
        }
    )
    @JoinColumn({
        name: 'contact_id'
    })
    public contact: Contact;
}