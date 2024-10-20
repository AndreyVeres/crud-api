import { createServer } from 'http';
import { AppRouter } from './app.router';
import { Request } from './utils/request';
import { Response } from './utils/response';
import { MiddleWare } from './types';
export class App {
  private router = new AppRouter();
  private middlewares: MiddleWare[] = [];

  use(middleware: MiddleWare) {
    this.middlewares.push(middleware);
  }

  start() {
    return createServer((req, res) => {
      const request = new Request(req);
      const response = new Response(res);

      this.middlewares.forEach((middleware) => {
        middleware(request, response, this.router.navigate.bind(this.router));
      });
    });
  }
}
