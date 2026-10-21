import type { ApiClient } from "@/lib/api-client";
import {
  AuthRegisterDto,
  AuthRegisterRequest,
  AuthRegistrationResponse,
} from "../../types";

type Dependencies = {
  apiClient: ApiClient;
  endpoint?: string;
};

export const createClientAuthRegisterRequest: (
  deps: Dependencies,
) => AuthRegisterRequest = (deps) => {
  const { apiClient, endpoint = "/auth/register" } = deps;

  return (dto: AuthRegisterDto) => {
    const body = { ...dto };

    return apiClient.post<AuthRegistrationResponse, AuthRegisterDto>(
      endpoint,
      body,
    );
  };
};
