import { cpus } from 'os';
import cluster from 'cluster';
import { createServer, request } from 'http';
import { config } from 'dotenv';
config();

const { WORKER_BASE_PORT, HOSTNAME } = process.env;
const numCPUs = cpus().length;

export class LoadBalancer {
  constructor() {
    this.currentWorker = 0;
    return this.#_init();
  }

  #_init() {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    const balancer = createServer((req, res) => {
      req.pipe(
        request(
          {
            hostname: HOSTNAME,
            port: +WORKER_BASE_PORT + this.currentWorker,
            path: req.url,
            method: req.method,
            headers: req.headers,
          },
          (proxyRes) => {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res, { end: true });
          }
        ),
        { end: true }
      );

      this.#setCurrentWorker();
    });

    return balancer;
  }

  #setCurrentWorker() {
    this.currentWorker = (this.currentWorker + 1) % numCPUs;
  }
}
