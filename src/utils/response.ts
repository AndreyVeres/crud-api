import { OutgoingHttpHeader, OutgoingHttpHeaders, ServerResponse } from 'http';

export class Response {
  private response;
  constructor(response: ServerResponse) {
    this.response = response;
  }

  end(data?: unknown) {
    return this.response.end(JSON.stringify(data));
  }

  status(status: number) {
    this.response.statusCode = status;
    return this;
  }

  writeHead(statusCode: number, headers?: OutgoingHttpHeaders | OutgoingHttpHeader[]) {
    return this.response.writeHead(statusCode, headers);
  }

  send(data: unknown) {
    this.end(data);
  }
}
