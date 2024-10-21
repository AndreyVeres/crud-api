import { OutgoingHttpHeader, OutgoingHttpHeaders, ServerResponse } from "http";

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

  set finished(value: boolean) {
    this.response.finished = value;
  }

  writeHead(
    statusCode: number,
    headers?: OutgoingHttpHeaders | OutgoingHttpHeader[]
  ) {
    return this.response.writeHead(statusCode, headers);
  }

  setHeader(name: string, value: number | string | readonly string[]) {
    return this.response.setHeader(name, value);
  }

  send(data: unknown) {
    this.end(data);
  }
}
