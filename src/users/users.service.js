import { db } from '../db.js';

export class UsersService {
  getAll() {
    return db.users;
  }

  getById(id) {
    return db.users.find((user) => user.id === id);
  }

  create(user) {
    db.users.push(user);
  }

  delete(id) {
    db.users = db.users.filter((user) => user.id !== id);
  }

  update(user, props) {
    return Object.assign(user, props);
  }
}
