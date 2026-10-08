import { AppConfig } from "@/config";
import { createClientApiClient } from "../api-client";
import { createRegistry } from "./registry.factory";
import { createClientLogger, Logger } from "../logger";

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
