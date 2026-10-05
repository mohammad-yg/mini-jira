import type { AuthLogoutRequest } from "../types/auth-requests-types";

type Dependencies = {
  logoutRequest: AuthLogoutRequest;
};

export const authLogout = async (deps: Dependencies) => {
  return deps.logoutRequest();
};
