import { config } from 'dotenv';
config();
import { App } from './app.js';

const { APP_PORT, HOSTNAME } = process.env;
new App().listen(APP_PORT).on('listening', () => console.warn(`The SERVER was started on http://${HOSTNAME}:${APP_PORT}`));
