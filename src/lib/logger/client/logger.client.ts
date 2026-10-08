"use client";

import type { ClientLogEntry, ClientLogPayload, LogLevel, Logger, LoggerOptions } from "../logger.type";

const DEFAULT_APP_NAME = "Mini Jira";
const LOGS_BFF_ENDPOINT = "/api/bff/logs";
const MAX_BATCH_LOGS = 100;
const MAX_BATCH_BYTES = 60 * 1024;
const MAX_ENTRY_VALUES_BYTES = 20 * 1024;
const MAX_VALUE_CHARACTERS = 8_000;
const logQueue: ClientLogEntry[] = [];
let areFlushListenersAttached = false;

const serializeValue = (value: unknown): unknown => {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      ...(value.stack ? { stack: value.stack } : {}),
    };
  }

  try {
    const serialized = JSON.stringify(value, (_key, nestedValue: unknown) => {
      if (nestedValue instanceof Error) {
        return {
          name: nestedValue.name,
          message: nestedValue.message,
          ...(nestedValue.stack ? { stack: nestedValue.stack } : {}),
        };
      }
      if (typeof nestedValue === "bigint") return nestedValue.toString();
      return nestedValue;
    });

    if (serialized === undefined) return String(value);
    if (serialized.length <= MAX_VALUE_CHARACTERS)
      return JSON.parse(serialized);
    return `${serialized.slice(0, MAX_VALUE_CHARACTERS)}...`;
  } catch {
    return String(value).slice(0, MAX_VALUE_CHARACTERS);
  }
};

const serializeValues = (values: unknown[]): unknown[] => {
  const serializedValues: unknown[] = [];
  let valueBytes = 0;

  for (let index = 0; index < values.length; index += 1) {
    const serializedValue = serializeValue(values[index]);
    const valueSize = new Blob([JSON.stringify(serializedValue)]).size;

    if (valueBytes + valueSize > MAX_ENTRY_VALUES_BYTES) {
      serializedValues.push(
        `[${values.length - index} log value(s) omitted: entry size limit]`,
      );
      break;
    }

    serializedValues.push(serializedValue);
    valueBytes += valueSize;
  }

  return serializedValues;
};

const createBeaconBatch = (): { entries: ClientLogEntry[]; body: Blob } => {
  const entries: ClientLogEntry[] = [];

  for (const entry of logQueue.slice(0, MAX_BATCH_LOGS)) {
    const candidate = [...entries, entry];
    const body = new Blob(
      [JSON.stringify({ logs: candidate } satisfies ClientLogPayload)],
      {
        type: "application/json",
      },
    );

    if (body.size > MAX_BATCH_BYTES) break;
    entries.push(entry);
  }

  return {
    entries,
    body: new Blob(
      [JSON.stringify({ logs: entries } satisfies ClientLogPayload)],
      {
        type: "application/json",
      },
    ),
  };
};

const flushClientLogs = (): void => {
  if (typeof navigator === "undefined" || !navigator.sendBeacon) return;

  while (logQueue.length > 0) {
    const { entries, body } = createBeaconBatch();
    if (entries.length === 0) return;

    let wasAccepted = false;
    try {
      wasAccepted = navigator.sendBeacon(LOGS_BFF_ENDPOINT, body);
    } catch {
      return;
    }

    if (!wasAccepted) return;
    logQueue.splice(0, entries.length);
  }
};

const attachFlushListeners = (): void => {
  if (areFlushListenersAttached || typeof window === "undefined") return;

  window.addEventListener("pagehide", flushClientLogs);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushClientLogs();
  });
  areFlushListenersAttached = true;
};

/** Creates a browser logger that buffers entries until the page is hidden. */
export const createClientLogger = ({
  appName = DEFAULT_APP_NAME,
}: LoggerOptions = {}): Logger => {
  attachFlushListeners();

  const write =
    (level: LogLevel) =>
      (...values: unknown[]) => {
        logQueue.push({
          app: appName,
          level,
          timestamp: new Date().toISOString(),
          values: serializeValues(values),
        });
      };

  return Object.freeze({
    debug: write("debug"),
    info: write("info"),
    warn: write("warn"),
    error: write("error"),
  });
};
