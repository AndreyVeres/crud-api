import { db } from '../db.js';

let database = db;

export class UsersService {
  constructor() {
    process.on('message', function ({ db }) {
      database = db;
    });
  }

  getAll() {
    return database.users;
  }

  getById(id) {
    return database.users.find((user) => user.id === id);
  }

  create(user) {
    database.users.push(user);
    this.#updateDb();
  }

  delete(id) {
    database.users = database.users.filter((user) => user.id !== id);
    this.#updateDb();
  }

  update(user, props) {
    const updatedUser = Object.assign(user, {
      ...props,
      id: user.id,
    });

    this.#updateDb();

    return updatedUser;
  }

  #updateDb() {
    process.send({ db: database });
  }
}
