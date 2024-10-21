import { v4 as uuid } from 'uuid';
import { UserValidator } from './user.validator';
import { ValidatorTouchOperator } from '../types';

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
        touchBy: ValidatorTouchOperator.TYPE_OF,
      })
      .validate();

    this.age = new UserValidator<number>('age', age)
      .useRules({
        type: 'number',
        touchBy: ValidatorTouchOperator.TYPE_OF,
      })
      .validate();

    this.hobbies = new UserValidator<string[]>('hobbies', hobbies)
      .useRules({
        instance: Array,
        touchBy: ValidatorTouchOperator.INSTANCE_OF,
        itemType: 'string',
      })
      .validate();

    this.id = uuid();
  }
}
