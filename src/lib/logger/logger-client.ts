"use client";

import type { Logger, LoggerOptions, LogLevel } from "./logger-types";

const DEFAULT_APP_NAME = "Mini Jira";

/** Creates a browser logger with a readable application prefix. */
export const createClientLogger = ({
  appName = DEFAULT_APP_NAME,
}: LoggerOptions = {}): Logger => {
  const write =
    (level: LogLevel) =>
      (...values: unknown[]) =>
        console[level](`[${appName}]`, ...values);

  return Object.freeze({
    debug: write("debug"),
    info: write("info"),
    warn: write("warn"),
    error: write("error"),
  });
};
