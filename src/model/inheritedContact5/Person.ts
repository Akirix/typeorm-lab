import {ChildEntity, OneToMany} from 'typeorm';
import Contact from './Contact';
import ContactDetail from './ContactDetail';

@ChildEntity('person')
export default class Person extends Contact {
    
    @OneToMany(
        (type: string) => { 
            console.log('The type in the person is ' + type);
            return ContactDetail;
        },
        ( detail: ContactDetail ) => detail.contact,
        {
            cascade: true
        }
    )
    public details: ContactDetail[];
    
}