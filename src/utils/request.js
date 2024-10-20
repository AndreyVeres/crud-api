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

  get urlParts() {
    return this.request.url.split('/').splice(1);
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
          reject(new Error(`Invalid JSON format: ${err.message}`));
        }
      });

      this.request.on('error', (err) => {
        reject(err);
      });
    });
  }
}
