import { createServer } from "http";
import { AppRouter } from "./app.router";
import { Request } from "./utils/request";
import { Response } from "./utils/response";
import { MiddleWare } from "./types";
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

      this.runMiddlewares(request, response);
    });
  }

  runMiddlewares(req: Request, res: Response) {
    let currentMiddlewareIndex = 0;

    const next = () => {
      if (currentMiddlewareIndex < this.middlewares.length) {
        const middleware = this.middlewares[currentMiddlewareIndex];
        currentMiddlewareIndex += 1;
        middleware(req, res, next);
      } else {
        this.router.navigate(req, res);
      }
    };
    next();
  }
}
