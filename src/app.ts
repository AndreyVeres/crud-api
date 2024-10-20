import { createServer } from 'http';
import { AppRouter } from './app.router';
import { Request } from './utils/request';
import { Response } from './utils/response';
export class App {
  private router = new AppRouter();

  start() {
    return createServer((req, res) => {
      const request = new Request(req);
      const response = new Response(res);

      this.router.navigate(request, response);
    });
  }
}
