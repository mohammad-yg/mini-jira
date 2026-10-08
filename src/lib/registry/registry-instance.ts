import { AppConfig } from "@/config";
import { createClientApiClient, createServerApiClient } from "../api-client";
import { createRegistry } from "./registry.factory";
import { createClientLogger, createServerLogger, Logger } from "../logger";

export const baseRegistry = createRegistry()
  .provide<"config", AppConfig>("config", () => ({
    bffApiBaseUrl: "/",
    apiServerBaseUrl: "http://localhost:4000/api/v1/",
  }))
  .provideForRuntime("apiClient", {
    client: ({ config }) =>
      createClientApiClient({
        bffApiBaseUrl: config.bffApiBaseUrl,
        fetcher: fetch,
      }),
    server: ({ config }) =>
      createServerApiClient({
        apiServerBaseUrl: config.apiServerBaseUrl,
        fetcher: fetch,
      }),
  })
  .provideForRuntime<"logger", Logger>("logger", {
    client: () => createClientLogger({ appName: "MINI_JIRA" }),
    server: () => createServerLogger({ appName: "MINI_JIRA" }),
  })
  .build();

export type GlobalRegistry = typeof baseRegistry;
