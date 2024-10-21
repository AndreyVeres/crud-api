import { MiddleWare } from "src/types";

export const headersMiddleware: MiddleWare = (_, res) => {
  res.setHeader("Content-type", "application/json");
};
