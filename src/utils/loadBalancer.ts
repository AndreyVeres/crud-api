import { cpus } from 'os';
import cluster from 'cluster';
import { createServer, request } from 'http';
import { config } from 'dotenv';
config();

const { WORKER_BASE_PORT, HOSTNAME } = process.env;

const numCPUs = cpus().length;

export class LoadBalancer {
  private currentWorker = 0;

  start() {
    cpus().forEach(() => cluster.fork());

    const balancer = this.createBalancer();
    this.watchDb();

    return balancer;
  }

  private watchDb() {
    cluster.on('message', (_, { db }) => {
      for (const id in cluster.workers) {
        if (cluster.workers[id]) {
          cluster.workers[id].send({
            db,
          });
        }
      }
    });
  }

  private createBalancer() {
    return createServer((req, res) => {
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
            if (proxyRes.statusCode) {
              res.writeHead(proxyRes.statusCode, proxyRes.headers);
              proxyRes.pipe(res, { end: true });
            }
          }
        ),
        { end: true }
      );

      this.setCurrentWorker();
    });
  }

  private setCurrentWorker() {
    this.currentWorker = (this.currentWorker + 1) % numCPUs;
  }
}
