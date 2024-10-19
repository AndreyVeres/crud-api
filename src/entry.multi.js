import { App } from './app.js';
import { config } from 'dotenv';
config();
import cluster from 'cluster';
import { LoadBalancer } from './loadBalancer.js';


const { WORKER_BASE_PORT, LOAD_BALANCER_PORT, HOSTNAME } = process.env;

if (cluster.isPrimary) {
  new LoadBalancer()
    .listen(LOAD_BALANCER_PORT)
    .on('listening', () => console.warn(`The Load Balancer was started on http://${HOSTNAME}:${LOAD_BALANCER_PORT}`));
} else {
  const workerPort = +WORKER_BASE_PORT + cluster.worker.id - 1;

  new App()
    .listen(workerPort)
    .on('request', () => console.warn(`The request was redirected by the Load Balancer to the port ${workerPort}`))
    .on('listening', () => console.warn(`The SERVER was started on http://${HOSTNAME}:${workerPort}`));
}
