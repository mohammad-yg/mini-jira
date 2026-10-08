import type {
  ClientLogEntry,
  ClientLogPayload,
} from "@/lib/logger/logger-types";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 60 * 1024;
const MAX_LOGS_PER_REQUEST = 100;
const API_BASE_URL = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:4000/api/v1"
).replace(/\/+$/, "");

const errorResponse = (message: string, status: number) =>
  Response.json({ error: message }, { status });

const isClientLogEntry = (value: unknown): value is ClientLogEntry => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const entry = value as Partial<ClientLogEntry>;
  return (
    typeof entry.app === "string" &&
    entry.app.length <= 120 &&
    (entry.level === "debug" ||
      entry.level === "info" ||
      entry.level === "warn" ||
      entry.level === "error") &&
    typeof entry.timestamp === "string" &&
    Number.isFinite(Date.parse(entry.timestamp)) &&
    Array.isArray(entry.values)
  );
};

const isClientLogPayload = (value: unknown): value is ClientLogPayload =>
  !!value &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  "logs" in value &&
  Array.isArray(value.logs) &&
  value.logs.length > 0 &&
  value.logs.length <= MAX_LOGS_PER_REQUEST &&
  value.logs.every(isClientLogEntry);

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES)
    return errorResponse("Log batch is too large", 413);

  let payload: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES)
      return errorResponse("Log batch is too large", 413);
    payload = JSON.parse(rawBody);
  } catch {
    return errorResponse("Invalid JSON request body", 400);
  }

  if (!isClientLogPayload(payload))
    return errorResponse("Invalid client log payload", 400);

  try {
    const upstream = await fetch(`${API_BASE_URL}/logs`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!upstream.ok)
      return errorResponse("Could not forward client logs", 502);

    return Response.json({ accepted: payload.logs.length }, { status: 202 });
  } catch {
    return errorResponse("Log service is unavailable", 502);
  }
}
