import type { AuthLogoutFactory } from "../types/auth-action.type";

export const createAuthLogout: AuthLogoutFactory =
  ({ logoutRequest }) =>
    async () =>
      await logoutRequest();
