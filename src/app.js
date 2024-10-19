import { createServer } from 'http';
import { AppRouter } from './app.router.js';
import { Request } from './utils/request.js';
import { Response } from './utils/response.js';
export class App {
  constructor() {
    this.router = new AppRouter();
    return this.#_init();
  }

  #_init() {
    return createServer((req, res) => {
      const request = new Request(req);
      const response = new Response(res);

      this.router.navigate(request, response);
    });
  }
}
