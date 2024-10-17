import { UsersController } from './users/users.controller.js';

export class AppRouter {
  constructor() {
    this.users = new UsersController();
  }

  async navigate(req, res) {
    const { method, params, urlParts } = req;
    const [root] = urlParts;
    const [id] = params;

    if (!root) {
      return res.status(200).end('Hello from server! Available routes = /users');
    }

    const handlerName = `${method}${id ? '_ID' : ''}`;

    if (!this[root]?.[handlerName]) {
      return res.status(404).end('route not found');
    }

    this[root][handlerName](req, res);
  }
}
