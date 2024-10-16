import { v4 as uuid } from 'uuid';

export class User {
  constructor({ name, age, hobbies }) {
    if (!name) throw Error('name is required field');
    this.name = name;

    if (!age) throw Error('age is required field');
    this.age = age;

    if (!hobbies) throw Error('hobbies is required field');
    this.hobbies = hobbies;

    this.id = uuid();
  }
}
