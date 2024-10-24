import { UsersController } from "./users/users.controller";
import { Response } from "./utils/response";
import { Request } from "./utils/request";
import { IncomingMessage, ServerResponse } from "http";
import { User } from "./users/user.model";

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export interface AppRoutes {
  users: UsersController;
}
export type AppRootRoute = keyof AppRoutes;
export type Primitive = "string" | "number";

export enum ValidatorTouchOperator {
  INSTANCE_OF = "instanceOf",
  TYPE_OF = "typeof",
}

export type InstanceType = ArrayConstructor;

type ControllerResponseType = Promise<ServerResponse<IncomingMessage>>;

export interface Controller {
  GET: (_: Request, res: Response) => ControllerResponseType;
  GET_ID(req: Request, res: Response): ControllerResponseType;
  DELETE_ID: (req: Request, res: Response) => ControllerResponseType;
  PUT_ID: (req: Request, res: Response) => ControllerResponseType;
  POST: (req: Request, res: Response) => void;
}
export type ControllerHandleName = keyof Controller;

export interface DataBase {
  users: User[];
}

export type MiddleWare = (
  req: Request,
  res: Response,
  next: (req: Request, res: Response) => void
) => void;
