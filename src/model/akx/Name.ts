/**
 * @module models
 */
import { Column } from "typeorm";

/**
 * This implementation of the [[imodel.Name]] interface sets up an embeddable entity.
 * Since it is used as an embeddable then there is no matching table for this class.
 * When some other class uses this class as an attribute, then the resulting table will
 * the columns defined in the attributes of this class.
 */
export default class Name {

    /**
     * @inheritdoc
     */
    @Column({
        name: 'name_first',
        comment: 'The first part of some name.'
    })
    public first: string;

    /**
     * @inheritdoc
     */
    @Column({
        name: 'name_middle',
        comment: 'The middle part of a name.',
        nullable: true
    })
    public middle: string;

    /**
     * @inheritdoc
     */
    @Column({
        name: 'name_last',
        comment: 'The last part of a name.',
        nullable: true
    })
    public last: string;

    /**
     * @inheritdoc
     */
    public get full(): string {
        return `${this.first} ${this.middle} ${this.last}`;
    }
}
