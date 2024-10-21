import { App } from './app';
import { config } from 'dotenv';
config();
import cluster from 'cluster';
import { LoadBalancer } from './utils/loadBalancer';
import { headersMiddleware } from './middlewares/headers.middleware';
import { bodyParserMiddleware } from './middlewares/bodyParser.middleware';

const { WORKER_BASE_PORT, LOAD_BALANCER_PORT, HOSTNAME } = process.env;

if (cluster.isPrimary) {
  const loadBalancer = new LoadBalancer();

  loadBalancer
    .start()
    .listen(LOAD_BALANCER_PORT)
    .on('listening', () => console.warn(`The Load Balancer was started on http://${HOSTNAME}:${LOAD_BALANCER_PORT}`));
} else {
  const app = new App();

  if (!cluster.worker) {
    throw Error(`Error read cluster.worker`);
  }

  const workerPort = +WORKER_BASE_PORT + cluster.worker.id - 1;

  app.use(headersMiddleware);
  app.use(bodyParserMiddleware);
  app
    .start()
    .listen(workerPort)
    .on('request', () => console.warn(`The request was redirected by the Load Balancer to the port ${workerPort}`))
    .on('listening', () => console.warn(`The WORKER was started on http://${HOSTNAME}:${workerPort}`));
}
