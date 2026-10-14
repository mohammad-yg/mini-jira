import type { ApiClient } from "@/lib/api-client";
import type { AuthLogoutRequest } from "../types/auth-requests.type";

type Dependencies = {
  apiClient: ApiClient;
  endpoint?: string;
};

export const createAuthLogoutRequest =
  ({ apiClient, endpoint = "auth/logout" }: Dependencies): AuthLogoutRequest =>
  (accessToken) =>
    apiClient.post<null>(endpoint, undefined, {
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    });
