import type { ApiClient } from "@/shared/services/api-client-types";
import type { AuthLogoutRequest } from "../types/auth-requests-types";

type Dependencies = {
  apiClient: ApiClient;
  accessToken?: string;
};

export const createAuthLogoutRequest = ({
  apiClient,
  accessToken,
}: Dependencies): AuthLogoutRequest => {
  const headers = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : undefined;

  return () =>
    apiClient.post<null>("auth/logout", undefined, {
      headers,
      credentials: "include",
    });
};
