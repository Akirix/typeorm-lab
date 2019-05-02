import { Column } from "typeorm";

export default class Name {

    @Column({
        name: 'name_first',
        comment: 'The first part of some name.'
    })
    public first: string;

    @Column({
        name: 'name_middle',
        comment: 'The middle part of a name.',
        nullable: true
    })
    public middle: string;

    @Column({
        name: 'name_last',
        comment: 'The last part of a name.'
    })
    public last: string;

    public get full(): string {
        return `${this.first} ${this.middle} ${this.last}`;
    }
}