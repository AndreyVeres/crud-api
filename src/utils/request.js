import { JsonService } from './json.service.js';

export class Request {
  constructor(request) {
    this.request = request;
  }

  get method() {
    return this.request.method;
  }

  get params() {
    const [_, ...params] = this.request.url.split('/').splice(1);
    return params;
  }

  async getBody() {
    return new Promise((resolve, reject) => {
      let body = '';

      this.request.on('data', (chunk) => {
        body += chunk.toString();
      });

      this.request.on('end', () => {
        if (this.request.headers['content-type'] === 'application/x-www-form-urlencoded') {
          resolve(new URLSearchParams(body));
        } else {
          resolve(JsonService.parse(body));
        }
      });

      this.request.on('error', (err) => {
        reject(err);
      });
    });
  }
}
