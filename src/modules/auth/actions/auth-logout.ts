import type { AuthLogoutFactory } from "../types/auth-action.type";
import { createAuthLogoutRequest } from "../requests/auth-logout-request";

export const createAuthLogout: AuthLogoutFactory = () => () =>
  createAuthLogoutRequest()();
