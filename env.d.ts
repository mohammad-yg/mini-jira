namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_URL: string;

    NEXT_PUBLIC_APP_BASE_URL: string;
    NEXT_PUBLIC_API_SERVER_BASE_URL: string;
    NEXT_PUBLIC_APP_NAME: string;

    NODE_ENV: "development" | "production" | "test";
  }
}
