import type { ApiClient } from "@/lib/api-client";
import type { AuthRegisterRequest } from "../types/auth-requests.type";
import type {
  AuthRegisterDto,
  AuthRegistrationResponse,
} from "../types/auth.type";

type Dependencies = {
  apiClient: ApiClient;
  endpoint?: string;
};

export const createAuthRegisterRequest: (
  deps: Dependencies,
) => AuthRegisterRequest = (deps) => {
  const { apiClient, endpoint = "auth/register" } = deps;

  return (dto: AuthRegisterDto) => {
    const body = { ...dto };

    return apiClient.post<AuthRegistrationResponse, AuthRegisterDto>(
      endpoint,
      body,
    );
  };
};
