import 'client-only'

import { AppConfig } from "@/config/types";

import { createClientApiClient } from '@/lib/api-client/client';
import { Logger } from '@/lib/logger';
import { createClientLogger } from '@/lib/logger/client';
import { ClientApiClient } from '@/lib/api-client/api-client.type';

import { createRegistry } from "../registry.factory";
import { Prettify } from '../registry.type';

const API_SERVER_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_BASE_URL;
const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

const clientGlobalRegistryBuild =
  createRegistry()
    .provide<"config", AppConfig>("config", () => ({
      apiServerBaseUrl: API_SERVER_BASE_URL,
      appBaseUrl: APP_BASE_URL,
      appName: APP_NAME
    }))
    .provide<'apiClient', ClientApiClient>("apiClient", ({ config }) => createClientApiClient({
      fetcher: fetch,
      appBaseUrl: config.appBaseUrl
    }))
    .provide<"logger", Logger>("logger", ({ config }) => createClientLogger({ appName: config.appName }))
    .build();

type ClientGlobalRegistry = Prettify<typeof clientGlobalRegistryBuild.instances>;
export const clientGlobalRegistry: ClientGlobalRegistry = clientGlobalRegistryBuild.instances