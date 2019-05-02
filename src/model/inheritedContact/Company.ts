import {ChildEntity} from 'typeorm';
import Contact from './Contact';

@ChildEntity('company')
export default class Company extends Contact {}