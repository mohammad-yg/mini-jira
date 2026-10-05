import type { ApiClient } from "@/shared/services/api-client-types";
import type { AuthGetUserProfileRequest } from "../types/auth-requests-types";

type Dependencies = {
  apiClient: ApiClient;
  accessToken?: string;
};

export const createAuthGetUserProfileRequest = ({
  apiClient,
  accessToken,
}: Dependencies): AuthGetUserProfileRequest => {
  const headers = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : undefined;

  return () =>
    apiClient.get("auth/me", {
      headers,
      credentials: "include",
    });
};
