import { AppRootRoute, RequestMethod } from './../types';
import { IncomingMessage } from 'http';

export class Request {
  private request: IncomingMessage;
  constructor(request: IncomingMessage) {
    this.request = request;
  }

  get method() {
    const method = this.request.method as RequestMethod;
    return method;
  }

  get root() {
    return this.request.url?.split('/').splice(1)[0] as AppRootRoute;
  }

  get params() {
    const [_, ...params] = this.request.url?.split('/').splice(1) || [];
    return params;
  }

  async getBody() {
    return new Promise((resolve, reject) => {
      let body = '';

      this.request.on('data', (chunk) => {
        body += chunk.toString();
      });

      this.request.on('end', () => {
        try {
          if (this.request.headers['content-type'] === 'application/x-www-form-urlencoded') {
            resolve(new URLSearchParams(body));
          } else {
            resolve(JSON.parse(body));
          }
        } catch (err) {
          reject(new Error(`Invalid JSON format: ${(err as Error).message}`));
        }
      });

      this.request.on('error', (err) => {
        reject(err);
      });
    });
  }
}
