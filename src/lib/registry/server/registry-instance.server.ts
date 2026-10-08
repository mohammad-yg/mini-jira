import "server-only"

import { createRegistry } from "../registry.factory"
import { createServerApiClient } from "@/lib/api-client/server/api-client.server"
import { baseRegistry } from "../registry-instance"
import { Logger } from "@/lib/logger";
import { AppConfig } from "@/config";
import { ServerApiClient } from "@/lib/api-client/api-client.type"
import { createServerLogger } from "@/lib/logger/server/logger.server";

const baseDeps = baseRegistry.instances;

export const serverRegistry = createRegistry()
    .provide<"config", AppConfig>("config", () => ({
        bffApiBaseUrl: "/",
        apiServerBaseUrl: "http://localhost:4000/api/v1/",
        appName: ''
    }))
    .provide<'apiClient', ServerApiClient>('apiClient', () => createServerApiClient({ apiServerBaseUrl: baseDeps.config.apiServerBaseUrl, fetcher: fetch }))
    .provide<'logger', Logger>('logger', () => createServerLogger({ appName: baseDeps.config.appName }))
    .build();
