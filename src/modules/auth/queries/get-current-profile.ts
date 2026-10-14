import { failedResult, successResult } from "@/utils/result";
import { createAuthGetUserProfileRequest } from "../requests/auth-profile-request";
import { AuthGetCurrentUserProfile } from "../types/auth-query.type";

export const createAuthGetCurrentUserProfile = (): AuthGetCurrentUserProfile => {
  const getProfileUserRequest = createAuthGetUserProfileRequest();

  return async () => {
    const response = await getProfileUserRequest();

    if (response.statusCode === 401)
      return failedResult({ code: "unauthorized" });

    if (response.statusCode !== 200 || !response.data)
      return failedResult({ code: "unknown" });

    return successResult(response.data);
  };
};
