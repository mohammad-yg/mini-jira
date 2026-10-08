import "server-only"
import { createRegistry } from "../registry.factory";
import { AppConfig } from "@/config";
import { createServerApiClient, ServerApiClient } from "@/lib/api-client/server";
import { Logger } from "@/lib/logger";
import { createServerLogger } from "@/lib/logger/server";

export const serverRegistry = createRegistry()
    .provide<"config", AppConfig>("config", () => ({
        bffApiBaseUrl: "/",
        apiServerBaseUrl: "http://localhost:4000/api/v1/",
        appName: ''
    }))
    .provide<'apiClient', ServerApiClient>('apiClient', ({ config }) => createServerApiClient({ apiServerBaseUrl: config.apiServerBaseUrl, fetcher: fetch }))
    .provide<'logger', Logger>('logger', ({ config }) => createServerLogger({ appName: config.appName }))
    .build();
