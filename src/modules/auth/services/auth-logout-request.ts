import type { ApiClient } from "@/lib/api-client";
import type { AuthLogoutRequest } from "../types/auth-requests.type";

type Dependencies = {
  apiClient: ApiClient;
};

export const createAuthLogoutRequest =
  ({ apiClient }: Dependencies): AuthLogoutRequest =>
  () =>
    apiClient.post<null>("auth/logout", undefined);
