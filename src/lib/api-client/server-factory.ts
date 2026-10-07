import { createApiClient } from "./api-client-core";
import type { ApiClient } from "./types";

const DEFAULT_SERVER_API_BASE_URL =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:4000/api/v1";

export const createServerApiClient = (
  accessToken?: string,
  apiBaseUrl = DEFAULT_SERVER_API_BASE_URL,
): ApiClient =>
  createApiClient(
    apiBaseUrl,
    accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  );
