declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: number;
      LOAD_BALANCER_PORT: number;
      WORKER_BASE_PORT: number;
      HOSTNAME: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
    }
  }
}

export {};
