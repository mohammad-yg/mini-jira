import type { ApiClient } from "@/lib/api-client";
import type { AuthGetUserProfileRequest } from "../types/auth-requests.type";

type Dependencies = {
  apiClient: ApiClient;
};

export const createAuthGetUserProfileRequest =
  ({ apiClient }: Dependencies): AuthGetUserProfileRequest =>
  () =>
    apiClient.get("auth/me");
