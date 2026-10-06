import type { AuthLogoutFactory } from "../types/auth-action-types";

export const createAuthLogout: AuthLogoutFactory =
  ({ logoutRequest }) =>
  async () =>
    logoutRequest();
