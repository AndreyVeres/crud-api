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

    const balancer = this.#createBalancer();
    this.#watchDb();

    return balancer;
  }

  #watchDb() {
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

  #createBalancer() {
    if (!WORKER_BASE_PORT || !HOSTNAME) {
      throw new Error('Environment variables WORKER_BASE_PORT and HOSTNAME must be set.');
    }

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

      this.#setCurrentWorker();
    });
  }

  #setCurrentWorker() {
    this.currentWorker = (this.currentWorker + 1) % numCPUs;
  }
}