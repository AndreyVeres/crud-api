import { config } from 'dotenv';
config();
import { App } from './app';

const { APP_PORT, HOSTNAME } = process.env;

const app = new App();


app
  .start()
  .listen(APP_PORT)
  .on('listening', () => console.warn(`The SERVER was started on http://${HOSTNAME}:${APP_PORT}`));