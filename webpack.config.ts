import { resolve } from 'node:path';
import { config as dotenvconfig } from 'dotenv';
dotenvconfig();

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  target: 'node',
  mode: isProduction ? 'production' : 'development',
  entry: resolve(__dirname, 'src', 'entry.ts'),
  output: {
    clean: true,
    filename: 'index.js',
    path: resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        exclude: ['/node_modules/'],
      },
    ],
  },
  resolve: { extensions: ['.ts', '.js'] },
};

export default config;
