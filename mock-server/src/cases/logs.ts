import type { ApiRouteDefinition } from "../types.js";
import type { ApiErrorOutput, ApiOutput, ClientLogsOutput } from "../types.js";

export type LogsCaseOutput = ApiOutput<ClientLogsOutput | ApiErrorOutput>;

export const LOGS_ROUTES = [
  ["POST", "/logs", "Receive client-side application logs"],
] as const satisfies readonly ApiRouteDefinition[];
