import { UsersController } from './users/users.controller';
import { Request } from './utils/request';
import { Response } from './utils/response';

interface AppRoutes {
  users: UsersController;
}
type ControllerMethods = keyof UsersController;

export class AppRouter {
  private routes: AppRoutes = {
    users: new UsersController(),
  };

  async navigate(req: Request, res: Response) {
    const { method, params, urlParts } = req;
    const [root] = urlParts as [keyof AppRoutes];
    const [id] = params;

    if (!root) {
      return res.status(200).end('Hello from server! Available routes = /users');
    }

    const handlerName = `${method}${id ? '_ID' : ''}` as ControllerMethods;

    if (!this.routes[root]?.[handlerName]) {
      return res.status(404).end('route not found');
    }

    this.routes[root][handlerName](req, res);
  }
}
