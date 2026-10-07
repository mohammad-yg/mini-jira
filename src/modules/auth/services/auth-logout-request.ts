import type { ApiClient } from "@/lib/api-client/types";
import type { AuthLogoutRequest } from "../types/auth-requests-types";

type Dependencies = {
  apiClient: ApiClient;
};

export const createAuthLogoutRequest =
  ({ apiClient }: Dependencies): AuthLogoutRequest =>
  () =>
    apiClient.post<null>("auth/logout", undefined);
