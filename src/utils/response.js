import { JsonService } from './json.service.js';

export class Response {
  constructor(response) {
    this.response = response;
  }

  end(data) {
    return this.response.end(JsonService.stringify(data));
  }

  status(status) {
    this.response.statusCode = status;
    return this;
  }
}
