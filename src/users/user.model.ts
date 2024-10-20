import { v4 as uuid } from 'uuid';
import { UserValidator } from './user.validator';

export class User {
  username: string;
  age: number;
  hobbies: string[];
  id: string;

  constructor(dto: Partial<User>) {
    Object.keys(dto).forEach((key) => {
      if (!this.hasOwnProperty(key)) {
        throw Error(`The '${key}' property is not a User property`);
      }
    });

    const { username, age, hobbies } = dto;

    this.username = new UserValidator<string>('username', username)
      .useRules({
        type: 'string',
        touchBy: 'typeof',
      })
      .validate();

    this.age = new UserValidator<number>('age', age)
      .useRules({
        type: 'number',
        touchBy: 'typeof',
      })
      .validate();

    this.hobbies = new UserValidator<string[]>('hobbies', hobbies)
      .useRules({
        instance: Array,
        touchBy: 'instanceOf',
        itemType: 'string',
      })
      .validate();

    this.id = uuid();
  }
}
