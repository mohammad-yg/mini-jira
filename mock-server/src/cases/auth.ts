import type { ApiRouteDefinition } from "../types.js";
import type {
  ApiErrorOutput,
  ApiOutput,
  AuthOutput,
  RefreshOutput,
  UserOutput,
} from "../types.js";

export type AuthCaseOutput = ApiOutput<
  AuthOutput | ApiErrorOutput | RefreshOutput | UserOutput | null
>;

export const AUTH_ROUTES = [
  ["POST", "/auth/register", "Register a user"],
  ["POST", "/auth/login", "Log in and receive a JWT"],
  ["POST", "/auth/logout", "Revoke token"],
  ["POST", "/auth/refresh", "Refresh access token"],
  ["GET", "/auth/me", "Current user profile"],
] as const satisfies readonly ApiRouteDefinition[];
