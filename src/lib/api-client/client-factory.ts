import { createApiClient } from "./api-client-core";
import type { ApiClient } from "./types";

const DEFAULT_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export const createClientApiClient = (
  apiBaseUrl = DEFAULT_API_BASE_URL,
): ApiClient => createApiClient(apiBaseUrl);
