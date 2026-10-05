import type { ApiClient } from "@/shared/services/api-client-types";
import type { AuthRefreshRequest } from "../types/auth-requests-types";
import type { AuthTokens } from "../types/auth-types";

type Dependencies = {
  apiClient: ApiClient;
};

export const createAuthRefreshRequest =
  ({ apiClient }: Dependencies): AuthRefreshRequest =>
  (refreshToken) =>
    apiClient.post<AuthTokens>("auth/refresh", { refreshToken });
