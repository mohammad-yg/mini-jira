import type { ApiClient } from "@/lib/api-client";
import type { AuthRefreshRequest } from "../types/auth-requests.type";
import type { AuthTokens } from "../types/auth.type";

type Dependencies = {
  apiClient: ApiClient;
};

export const createAuthRefreshRequest =
  ({ apiClient }: Dependencies): AuthRefreshRequest =>
  (refreshToken) =>
    apiClient.post<AuthTokens>("auth/refresh", { refreshToken });
