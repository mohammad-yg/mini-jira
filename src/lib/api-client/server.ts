import "server-only";

import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { serverRegistry } from "@/lib/registry/injectors/server-registry";
import { createServerApiClient } from "./server-factory";
import { apiClientRegistryToken } from "./registry-token";
import type { ApiClient } from "./types";

export { createServerApiClient } from "./server-factory";

export const serverApiClient = serverRegistry.resolve(apiClientRegistryToken);

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
