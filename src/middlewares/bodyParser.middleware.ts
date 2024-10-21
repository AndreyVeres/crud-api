import type { MiddleWare } from '../types';

export const bodyParserMiddleware: MiddleWare = (req, res, next) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      if (body.length) {
        req.body = JSON.parse(body);
      }
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON format' }));
    }

    next(req, res);
  });

  req.on('error', (err) => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Server error' }));
  });
};
