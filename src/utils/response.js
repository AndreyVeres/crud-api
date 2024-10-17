export class Response {
  constructor(response) {
    this.response = response;
  }

  end(data) {
    return this.response.end(JSON.stringify(data));
  }

  status(status) {
    this.response.statusCode = status;
    return this;
  }
}
