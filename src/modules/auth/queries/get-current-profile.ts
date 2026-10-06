import { failedResult, successResult } from "@/shared/result";
import { AuthGetCurrentUserProfile } from "../types/auth-query-types";
import { AuthGetUserProfileRequest } from "../types/auth-requests-types";

type Dependencies = {
  getProfileUserRequest: AuthGetUserProfileRequest;
};

export const createAuthGetCurrentUserProfile = (
  deps: Dependencies,
): AuthGetCurrentUserProfile => {
  const { getProfileUserRequest } = deps;

  return async () => {
    const response = await getProfileUserRequest();

    if (response.statusCode === 401)
      return failedResult({ code: "unauthorized" });

    if (response.statusCode !== 200 || !response.data)
      return failedResult({ code: "unknown" });

    return successResult(response.data);
  };
};
