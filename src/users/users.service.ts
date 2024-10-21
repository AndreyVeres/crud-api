import { User } from './user.model';
import { Service } from '../utils/service';

export class UsersService extends Service {
  constructor() {
    super();
  }

  getAll() {
    return this.database.users;
  }

  getById(id: string) {
    return this.database.users.find((user) => user.id === id);
  }

  create(user: User) {
    this.database.users.push(user);
    this.updateDb();
  }

  delete(id: string) {
    this.database.users = this.database.users.filter((user) => user.id !== id);
    this.updateDb();
  }

  update(user: User, props: Partial<User>) {
    const updatedUser = Object.assign(user, {
      ...props,
      id: user.id,
    });

    this.updateDb();

    return updatedUser;
  }
}
