import type { AuthRegisterFactory } from "../types/auth-action.type";
import { createAuthRegisterRequest } from "../requests/auth-register-request";
import { baseRegistry } from "@/lib/registry/client/registry-instance.client";

export const createAuthRegister: AuthRegisterFactory =
  () =>
  (dto) =>
    createAuthRegisterRequest({
      apiClient: baseRegistry.get("apiClient"),
      endpoint: "/api/auth/register",
    })(dto);
