import { v4 as uuid } from 'uuid';
import { UserValidator } from './user.validator.js';

export class User {
  username;
  age;
  hobbies;

  constructor(dto) {
    Object.keys(dto).forEach((key) => {
      if (!this.hasOwnProperty(key)) {
        throw Error(`The '${key}' property is not a User property`);
      }
    });

    const { username, age, hobbies } = dto;

    this.username = new UserValidator('username', username)
      .useRules({
        type: 'string',
        touchBy: 'typeof',
      })
      .validate();

    this.age = new UserValidator('age', age)
      .useRules({
        type: 'number',
        touchBy: 'typeof',
      })
      .validate();

    this.hobbies = new UserValidator('hobbies', hobbies)
      .useRules({
        type: Array,
        touchBy: 'instanceOf',
        itemType: 'string',
      })
      .validate();

    this.id = uuid();
  }
}
