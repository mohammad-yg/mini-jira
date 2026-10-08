export type LogLevel = "debug" | "info" | "warn" | "error";

/** JSON-safe client log entry sent to the log BFF. */
export interface ClientLogEntry {
  app: string;
  level: LogLevel;
  timestamp: string;
  values: unknown[];
}

/** Request body accepted by the client log BFF and API. */
export interface ClientLogPayload {
  logs: ClientLogEntry[];
}

export interface Logger {
  debug(...values: unknown[]): void;
  info(...values: unknown[]): void;
  warn(...values: unknown[]): void;
  error(...values: unknown[]): void;
}

export interface LoggerOptions {
  appName?: string;
}
