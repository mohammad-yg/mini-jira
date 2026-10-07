import type { ApiClient } from "@/lib/api-client/types";
import type { AuthGetUserProfileRequest } from "../types/auth-requests-types";

type Dependencies = {
  apiClient: ApiClient;
};

export const createAuthGetUserProfileRequest =
  ({ apiClient }: Dependencies): AuthGetUserProfileRequest =>
  () =>
    apiClient.get("auth/me");
