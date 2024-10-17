import { App } from './app.js';
import { config } from 'dotenv';
config();

const PORT = process.env.PORT;
const app = new App();

app.start(PORT);
