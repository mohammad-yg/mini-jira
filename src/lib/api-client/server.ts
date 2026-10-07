import "server-only";

import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
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

export const serverApiClient = createServerApiClient();

export const createBffApiClient = async (
  request: NextRequest,
): Promise<{ apiClient: ApiClient; isAuthenticated: boolean }> => {
  const secret = process.env.AUTH_SECRET;
  const token = secret
    ? await getToken({
        req: request,
        secret,
        secureCookie: request.nextUrl.protocol === "https:",
      })
    : null;
  const accessToken = token?.backendAccessToken;

  if (typeof accessToken !== "string") {
    return { apiClient: serverApiClient, isAuthenticated: false };
  }

  return {
    apiClient: createServerApiClient(accessToken),
    isAuthenticated: true,
  };
};
