import type { ApiRouteDefinition } from "../types.js";
import type { ApiErrorOutput, ApiOutput, UserOutput } from "../types.js";

export type UsersCaseOutput = ApiOutput<
  ApiErrorOutput | UserOutput | UserOutput[] | null
>;

export const USERS_ROUTES = [
  ["GET", "/users", "List users (admin)"],
  ["GET", "/users/:id", "Get user"],
  ["PATCH", "/users/:id", "Update user"],
  ["DELETE", "/users/:id", "Delete user"],
] as const satisfies readonly ApiRouteDefinition[];
