import { createApiClient } from "./api-client-core";
import { apiClientRegistryToken } from "./registry-token";
import { forEnvironment, registry } from "@/lib/registery";
import type { ApiClient } from "./types";

const DEFAULT_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export const createClientApiClient = (
  apiBaseUrl = DEFAULT_API_BASE_URL,
): ApiClient => createApiClient(apiBaseUrl);

registry.provide(
  apiClientRegistryToken,
  forEnvironment("client")(createClientApiClient()),
);

export const clientApiClient = registry.resolve(
  apiClientRegistryToken,
  "client",
);
