import type { AuthLoginFactory } from "../types/auth-action.type";

export const createAuthLogin: AuthLoginFactory =
  ({ loginRequest }) =>
  async (credentials) =>
    loginRequest(credentials);
