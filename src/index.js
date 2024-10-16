import { App } from './app.js';
import { config } from 'dotenv';

// config();

new App().init().listen(process.env.PORT);
