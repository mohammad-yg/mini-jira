import type { ApiClient } from "@/lib/api-client";
import type { AuthRegisterRequest } from "../types/auth-requests.type";
import type {
  AuthRegisterDto,
  AuthRegistrationResponse,
} from "../types/auth.type";

type Dependencies = {
  apiClient: ApiClient;
};

export const createAuthRegisterRequest: (
  deps: Dependencies,
) => AuthRegisterRequest = (deps) => {
  const { apiClient } = deps;

  return (dto: AuthRegisterDto) => {
    const url = "auth/register";
    const body = { ...dto };

    return apiClient.post<AuthRegistrationResponse, AuthRegisterDto>(url, body);
  };
};
