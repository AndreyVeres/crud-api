import { MiddleWare } from 'src/types';

export const headersMiddleware: MiddleWare = (req, res, next) => {
  res.writeHead(200, {
    'Content-type': 'application/json',
  });

  next(req, res);
};
