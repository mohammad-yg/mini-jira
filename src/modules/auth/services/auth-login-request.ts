import type { ApiClient } from "@/shared/services/api-client-types";
import type { AuthLoginRequest } from "../types/auth-requests-types";
import type { AuthCredentials, AuthLoginResponse } from "../types/auth-types";

type Dependencies = {
  apiClient: ApiClient;
};

export const createAuthLoginRequest = (
  deps: Dependencies,
): AuthLoginRequest => {
  const { apiClient } = deps;

  return (credentials: AuthCredentials) => {
    const url = "auth/login";
    const body = { ...credentials };

    return apiClient.post<AuthLoginResponse, AuthCredentials>(url, body);
  };
};
