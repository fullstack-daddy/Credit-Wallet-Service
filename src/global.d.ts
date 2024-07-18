declare module 'bcrypt';
declare module 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_PORT?: string;
      DB_SSL?: string;
    }
  }
}

export {};
