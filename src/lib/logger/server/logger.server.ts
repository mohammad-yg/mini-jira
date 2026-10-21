import "server-only";

import type { Logger, LoggerOptions, LogLevel } from "../logger.type";

const DEFAULT_APP_NAME = "Mini Jira";

/** Creates a server logger that emits structured records for log processors. */
export const createServerLogger = ({
  appName = DEFAULT_APP_NAME,
}: LoggerOptions = {}): Logger => {
  const write =
    (level: LogLevel) =>
    (...values: unknown[]) =>
      console[level]({
        app: appName,
        level,
        timestamp: new Date().toISOString(),
        values,
      });

  return Object.freeze({
    debug: write("debug"),
    info: write("info"),
    warn: write("warn"),
    error: write("error"),
  });
};
