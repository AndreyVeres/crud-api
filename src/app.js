import { createServer } from 'http';
import { AppRouter } from './app.router.js';
import { Request } from './utils/request.js';
import { Response } from './utils/response.js';

export class App {
  constructor() {
    this.router = new AppRouter();
  }

  init() {
    return createServer((req, res) => {
      const [root] = req.url.split('/').splice(1);

      const request = new Request(req);
      const response = new Response(res);

      this.router.navigate(root, request, response);
    });
  }
}
