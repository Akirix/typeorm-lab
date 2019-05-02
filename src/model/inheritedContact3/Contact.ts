import { Entity, PrimaryGeneratedColumn, Column, OneToMany, TableInheritance } from "typeorm";
import Name from './Name';
import ContactDetail from './ContactDetail';


@Entity({
    name: 'contact'
})
@TableInheritance( {
    column: {
        type: "varchar",
        name: "type",
        default: 'person'
    }
} )
export default abstract class Contact {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column(
        () => Name,
        {
            prefix: false
        }
    )
    public name: Name;

    @OneToMany(
        () => ContactDetail,
        ( detail: ContactDetail ) => detail.contact,
        {
            cascade: true
        }
    )
    public details: ContactDetail[];

}
