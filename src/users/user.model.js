import { v4 as uuid } from 'uuid';
import { RequiredError } from '../utils/required.js';

export class User {
  constructor({ name, age, hobbies }) {
    if (!name) throw new RequiredError('name is required field');
    this.name = name;

    if (!age) throw new RequiredError('age is required field');
    this.age = age;

    if (!hobbies) throw new RequiredError('hobbies is required field');
    this.hobbies = hobbies;

    this.id = uuid();
  }
}
