import type { AppConfig } from "@/config";
import { createRegistry } from "../registry.factory";
import type { Logger } from "@/lib/logger";
import { createClientApiClient } from "@/lib/api-client/client";
import { createClientLogger } from "@/lib/logger/client";

export const baseRegistry = createRegistry()
  .provide<"config", AppConfig>("config", () => ({
    bffApiBaseUrl: "/",
    apiServerBaseUrl: "http://localhost:4000/api/v1/",
    appName: ''
  }))
  .provide("apiClient", ({ config }) => createClientApiClient({
    bffApiBaseUrl: config.bffApiBaseUrl,
    fetcher: fetch,
  }),)
  .provide<"logger", Logger>("logger", ({ config }) => createClientLogger({ appName: config.appName }))
  .build();

export type GlobalRegistry = typeof baseRegistry;
