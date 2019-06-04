/**
 * @module models
 */
import { Entity, PrimaryColumn, Column, OneToMany, TableInheritance, Check } from 'typeorm';
import _ from 'lodash';
import Name from './Name';
import Phone from "./Phone";
import Email from "./Email";

/**
 * The different types a contact can be.
 *
 * @see [[Contact]]
 */
export enum ContactTypes {

    /**
     * @see [[Person]]
     */
    PERSON = 'person',

    /**
     * @see [[Company]]
     */
    COMPANY = 'company',

    /**
     * @see [[PartnerBank]]
     */
    PARTNER_BANK = 'partner_bank'
}

/**
 * The implementation of the [[imodel.Contact]] interface. This class is abstract so it must be extended.
 * The  strategy is {@link https://type.io/#/entity-inheritance/single-table-inheritance|single table inheritence}
 * meaning one of the table columns is the discriminator for declaring a type, in this case the column is called type.
 *
 * @see [[ContactTypes]] the different types of a contact.
 *
 * @diagram {@link https://vpuber.akxdev.com/content/Diagram_j8bEyFaAUFAUIkLY.html|Contact }
 *
 * @example
 * ```ts
 *
 * //Creating a new type of contact
 * @ChildEntity(ContactTypes.FOO)
 * export default class Foo extends Contact implements imodel.Foo {
 *    constructor() {
 *        super();
 *    }
 * }
 * ```
 */
@Entity({
    name: 'contact'
})
@TableInheritance( {
    column: {
        type: "varchar",
        name: "type",
        // default: ContactTypes.PERSON,
        primary: true
    }
} )
@Check(`"type" in ('${ContactTypes.PERSON}','${ContactTypes.COMPANY}','${ContactTypes.PARTNER_BANK}')`)
export default abstract class Contact {

    public abstract type: ContactTypes;

    /**
     * @inheritdoc
     */
    @PrimaryColumn()
    public id: string;

    /**
     * @inheritdoc
     */
    @Column(
        () => Name,
        {
            prefix: false
        }
    )
    public name: Name;

    /**
     * @inheritdoc
     */
    @OneToMany(
        () => Phone,
        ( phone: Phone ) => phone.contact
    )
    public phones: Phone[];

    /**
     * @inheritdoc
     */
    @OneToMany( () => Email, (email: Email ) => email.contact )
    public emails: Email[];
}
