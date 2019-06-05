/**
 * @module models
 */
import {ChildEntity, Column, OneToMany} from 'typeorm';
import Contact, { ContactTypes } from './Contact';
import Phone from "./Phone";

/**
 * A concrete extension of a [[Contact]]. This  still maps to the contact table
 * and uses the value [[ContactTypes.PERSON]] as the discriminator in the type column.
 */
@ChildEntity(ContactTypes.PERSON)
export default class Person extends Contact {

}
