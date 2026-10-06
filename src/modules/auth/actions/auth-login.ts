import type { AuthLoginFactory } from "../types/auth-action-types";

export const createAuthLogin: AuthLoginFactory =
  ({ loginRequest }) =>
  async (credentials) =>
    loginRequest(credentials);
