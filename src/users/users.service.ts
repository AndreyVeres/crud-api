import { db } from '../db';
import { User } from './user.model';

let database = db;

export class UsersService {
  constructor() {
    process.on('message', ({ db }) => {
      if (db) {
        database = db;
      }
    });
  }

  getAll() {
    return database.users;
  }

  getById(id: string) {
    return database.users.find((user) => user.id === id);
  }

  create(user: User) {
    database.users.push(user);
    this.#updateDb();
  }

  delete(id: string) {
    database.users = database.users.filter((user) => user.id !== id);
    this.#updateDb();
  }

  update(user: User, props: Partial<User>) {
    const updatedUser = Object.assign(user, {
      ...props,
      id: user.id,
    });

    this.#updateDb();

    return updatedUser;
  }

  #updateDb() {
    if (process.send) {
      process.send({ db: database });
    }
  }
}
