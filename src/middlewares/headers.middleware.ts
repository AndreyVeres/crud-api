import { MiddleWare } from "src/types";

export const headersMiddleware: MiddleWare = (req, res, next) => {
  res.setHeader("Content-type", "application/json");
  next(req, res);
};
