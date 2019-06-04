/**
 * @module models
 */
import { Entity, Column, TableInheritance, Check } from "typeorm";
import {ContactTypes} from "./Contact";
/**
 * Different types of details on a user.
 *
 * @see [[ContactDetail]]
 */
export enum DetailTypes {

    /**
     * @see [[Phone]]
     */
    PHONE = 'phone',

    /**
     * @see [[Email]]
     */
    EMAIL = 'email'
}

/**
 * The abstract  class realizing the Contact detail table from the DB. A contact detail is a simple
 * key value pair for a piece of infation related to a contact such as phone numbers, emails, special
 * dates, etc. The table in the DB has a column called type which is used as the discriminator value when
 * extending this class. The  strategy is {@link https://type.io/#/entity-inheritance/single-table-inheritance|single table inheritence}
 * meaning one of the table columns is the discriminator for declaring a type, in this case the column is called type.
 *
 * @typeparam T The type of the value column for a child entity. i.e. child entity binds their own type for value.
 *
 * @see [[DetailTypes]] The values to determine type and to set the discriminator column.
 *
 * @diagram {@link https://vpuber.akxdev.com/content/Diagram_dzxMyFaAUFAUIlm6.html| Diagram}
 *
 * @example
 * ```ts
 *
 * // Child entity extending ContactDetail with discriminator value of `foo` and the value property set as a string.
 * @ChildEntity(DetailTypes.FOO)
 * class Foo extends ContactDetail<string> implements imodel.Foo {
 *
 *   @Column({
 *       type: 'varchar'
 *   })
 *   public value: string;
 * }
 * ```
 *
 */
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
export default abstract class ContactDetail<T>{

    public abstract type: DetailTypes;

    @Column({
        name: 'contact_type',
        primary: true
    })
    public contact_type: string;

    @Column({
        name: 'contact_id',
        primary: true
    })
    public contact_id: string;

    /**
     * @inheritdoc
     */
    @Column({
        primary: true
    })
    public slug: string;

    /**
     * @inheritdoc
     */
    @Column({
        name: 'default',
        default: false
    })
    public isDefault: boolean;

    /**
     * The abstract value with no type yet. The implementing class can
     * describe what the type is.
     */
    public abstract value: T;

}
