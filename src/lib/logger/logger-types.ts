export type LogLevel = "debug" | "info" | "warn" | "error";

export interface Logger {
  debug(...values: unknown[]): void;
  info(...values: unknown[]): void;
  warn(...values: unknown[]): void;
  error(...values: unknown[]): void;
}

export interface LoggerOptions {
  appName?: string;
}
