import "server-only";

import { AppConfig } from "@/config/types";
import { createServerApiClient } from "@/lib/api-client/server";
import { createServerLogger } from "@/lib/logger/server";

const API_SERVER_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_BASE_URL;
const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export const serverGlobalRegistry = async () => {
  const config: AppConfig = {
    apiServerBaseUrl: API_SERVER_BASE_URL,
    appBaseUrl: APP_BASE_URL,
    appName: APP_NAME,
  };

  const apiClient = createServerApiClient({
    fetcher: fetch,
    serverBaseUrl: config.apiServerBaseUrl,
  });
  const logger = createServerLogger({
    appName: config.appName,
  });

  return {
    config,
    apiClient,
    logger,
  };
};
