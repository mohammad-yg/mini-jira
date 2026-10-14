import type { AuthLoginFactory } from "../types/auth-action.type";
import { createAuthLoginRequest } from "../requests/auth-login-request";

export const createAuthLogin: AuthLoginFactory =
  () => (credentials) => createAuthLoginRequest()(credentials);
