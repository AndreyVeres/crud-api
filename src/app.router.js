import { UsersController } from './users/users.controller.js';

export class AppRouter {
  constructor() {
    this.users = new UsersController();
  }

  async navigate(root, req, res) {
    if (!this[root]) {
      return res.end('Route not found');
    }

    const { method } = req;

    this[root][method](req, res);
  }
}
