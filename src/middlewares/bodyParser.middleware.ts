import type { MiddleWare } from "../types";

export const bodyParserMiddleware: MiddleWare = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    req.body = JSON.parse(body);
    res.finished = false;
  });
};
