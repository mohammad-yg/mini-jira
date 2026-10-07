import { createErrorApiResponse, createSuccessApiResponse } from "./factories";
import type {
  ApiClient,
  ApiQuery,
  ApiRequestConfig,
  ApiRequestOptions,
} from "./types";
import type { ApiResponse, ApiResponseError } from "./api-response-types";

const buildUrl = (
  path: string,
  query: ApiQuery | undefined,
  apiBaseUrl: string,
): string => {
  const isAbsolute = /^[a-z][a-z\d+.-]*:\/\//i.test(path);
  const baseUrl = isAbsolute ? undefined : apiBaseUrl.replace(/\/+$/, "") + "/";
  const relativeBase = baseUrl && !/^[a-z][a-z\d+.-]*:\/\//i.test(baseUrl);
  const url = new URL(
    isAbsolute ? path : path.replace(/^\/+/, ""),
    relativeBase ? new URL(baseUrl, "http://api-client.local") : baseUrl,
  );

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      for (const item of Array.isArray(value) ? value : [value]) {
        if (item !== null && item !== undefined) {
          url.searchParams.append(key, String(item));
        }
      }
    }
  }

  return relativeBase
    ? `${url.pathname}${url.search}${url.hash}`
    : url.toString();
};

const readResponse = async (response: Response): Promise<unknown> => {
  if (response.status === 204 || response.status === 205) return null;

  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
};

const errorFromResponse = (
  status: number,
  payload: unknown,
): ApiResponseError => {
  if (payload && typeof payload === "object") {
    const body = payload as Record<string, unknown>;
    const nestedError = body.error;
    if (nestedError && typeof nestedError === "object") {
      const nested = nestedError as Record<string, unknown>;
      return {
        message:
          typeof nested.message === "string"
            ? nested.message
            : `Request failed (${status})`,
        code: typeof nested.code === "string" ? nested.code : String(status),
      };
    }

    const message =
      typeof body.message === "string"
        ? body.message
        : typeof body.error === "string"
          ? body.error
          : `Request failed (${status})`;
    return {
      message,
      code: typeof body.code === "string" ? body.code : String(status),
    };
  }

  return {
    message:
      typeof payload === "string" && payload
        ? payload
        : `Request failed (${status})`,
    code: String(status),
  };
};

const request = async <TData, TBody>(
  path: string,
  config: ApiRequestConfig<TBody>,
  apiBaseUrl: string,
  defaultHeaders?: HeadersInit,
): Promise<ApiResponse<TData>> => {
  const headers = new Headers(defaultHeaders);
  new Headers(config.headers).forEach((value, key) => headers.set(key, value));
  headers.set("Accept", "application/json");

  const hasBody = config.body !== undefined;
  if (hasBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const response = await fetch(buildUrl(path, config.query, apiBaseUrl), {
      method: config.method,
      headers,
      body: hasBody ? JSON.stringify(config.body) : undefined,
      signal: config.signal,
      credentials: config.credentials,
      cache: "no-store",
    });
    const payload = await readResponse(response);

    if (!response.ok) {
      return createErrorApiResponse<TData>(
        errorFromResponse(response.status, payload),
        response.status,
      );
    }

    return createSuccessApiResponse(payload as TData, response.status);
  } catch (error) {
    return createErrorApiResponse<TData>({
      message:
        error instanceof Error ? error.message : "Network request failed",
      code:
        error instanceof DOMException && error.name === "AbortError"
          ? "ABORTED"
          : "NETWORK_ERROR",
    });
  }
};

export const createApiClient = (
  apiBaseUrl: string,
  defaultHeaders?: HeadersInit,
): ApiClient => {
  const requestFromBase = <TData = unknown, TBody = unknown>(
    url: string,
    config: ApiRequestConfig<TBody>,
  ) => request<TData, TBody>(url, config, apiBaseUrl, defaultHeaders);

  const withMethod =
    (method: ApiRequestConfig["method"]) =>
    <TData = unknown, TBody = unknown>(
      url: string,
      body?: TBody,
      options: ApiRequestOptions = {},
    ) =>
      requestFromBase<TData, TBody>(url, { ...options, method, body });

  return {
    request: requestFromBase,
    get: (url, options = {}) =>
      requestFromBase(url, { ...options, method: "GET" }),
    post: withMethod("POST"),
    put: withMethod("PUT"),
    patch: withMethod("PATCH"),
    delete: (url, options = {}) =>
      requestFromBase(url, {
        ...options,
        method: "DELETE",
        body: options.body,
      }),
  };
};
