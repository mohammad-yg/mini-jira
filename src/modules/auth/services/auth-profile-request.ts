import type { ApiClient } from "@/lib/api-client";
import type { AuthGetUserProfileRequest } from "../types/auth-requests.type";

type Dependencies = {
  apiClient: ApiClient;
  endpoint?: string;
};

export const createAuthGetUserProfileRequest =
  ({
    apiClient,
    endpoint = "auth/me",
  }: Dependencies): AuthGetUserProfileRequest =>
  () =>
    apiClient.get(endpoint);
