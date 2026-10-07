import type { ApiClient } from "@/lib/api-client/types";
import type { AuthRegisterRequest } from "../types/auth-requests-types";
import type {
  AuthRegisterDto,
  AuthRegistrationResponse,
} from "../types/auth-types";

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
