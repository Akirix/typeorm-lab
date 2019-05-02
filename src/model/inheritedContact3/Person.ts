import {ChildEntity} from 'typeorm';
import Contact from './Contact';

@ChildEntity('person')
export default class Person extends Contact {}