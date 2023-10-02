declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      [key: string]: string | undefined;
      APP_SECRET: string;
      APP_WEB_URL: string;
      APP_API_URL: string;
      PORT: string;
      MAIL_DRIVER: string;
      MAIL_ADDRESS_DEFAULT: string;
      MAIL_SENDER_DEFAULT: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_DEFAULT_REGION: string;
      AWS_BUCKET_NAME: string;
      STORAGE_DRIVER: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_PASSWORD: string;
    }
  }
}
