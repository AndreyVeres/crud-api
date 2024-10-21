import { AppRootRoute, RequestMethod } from "./../types";
import { IncomingMessage } from "http";

export class Request {
  private request: IncomingMessage;
  body: string;
  constructor(request: IncomingMessage) {
    this.request = request;
  }

  get on() {
    return this.request.on.bind(this.request);
  }

  get method() {
    const method = this.request.method as RequestMethod;
    return method;
  }

  get root() {
    return this.request.url?.split("/").splice(1)[0] as AppRootRoute;
  }

  get params() {
    const [_, ...params] = this.request.url?.split("/").splice(1) || [];
    return params;
  }

  get req() {
    return this.request;
  }
}
