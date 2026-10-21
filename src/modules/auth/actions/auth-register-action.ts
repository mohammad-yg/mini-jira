import type { AuthRegisterAction } from "../types/auth-action.type";
import { AuthRegisterRequest } from "../types";
import { failedResult, successResult } from "@/utils/result";

interface Dependencies {
  authRegisterRequest: AuthRegisterRequest;
}

export const createAuthRegisterAction = (
  deps: Dependencies,
): AuthRegisterAction => {
  const { authRegisterRequest } = deps;

  return async (dto) => {
    const response = await authRegisterRequest(dto);

    if (!response.ok || !response.data) {
      return failedResult({ code: "unknown", message: "" });
    }

    return successResult(response.data);
  };
};
