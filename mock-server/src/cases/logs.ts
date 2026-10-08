import type { ApiRouteDefinition } from "../types.type.js";
import type {
  ApiErrorOutput,
  ApiOutput,
  ClientLogsOutput,
} from "../types.type.js";

export type LogsCaseOutput = ApiOutput<ClientLogsOutput | ApiErrorOutput>;

export const LOGS_ROUTES = [
  ["POST", "/logs", "Receive client-side application logs"],
] as const satisfies readonly ApiRouteDefinition[];
