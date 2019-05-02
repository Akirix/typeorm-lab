import {ChildEntity, OneToMany} from 'typeorm';
import Contact from './Contact';
import ContactDetail from './ContactDetail';

@ChildEntity('company')
export default class Company extends Contact {
    
    @OneToMany(
        () => ContactDetail,
        ( detail: ContactDetail ) => detail.contact,
        {
            cascade: true
        }
    )
    public details: ContactDetail[];
    
}