import type { ApiResponse } from "./api-response-types";

export type ApiHttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiQueryValue = string | number | boolean | null | undefined;

/** Values accepted for URL query parameters. Nullish values can be omitted by the client implementation. */
export type ApiQuery = Readonly<
  Record<string, ApiQueryValue | readonly ApiQueryValue[]>
>;

export interface ApiRequestOptions {
  headers?: HeadersInit;
  query?: ApiQuery;
  signal?: AbortSignal;
  credentials?: RequestCredentials;
}

export interface ApiRequestConfig<TBody = unknown> extends ApiRequestOptions {
  method: ApiHttpMethod;
  body?: TBody;
}

/** HTTP client contract. Implementations normalize transport and server errors into ApiResponse. */
export interface ApiClient {
  request<TData = unknown, TBody = unknown>(
    url: string,
    config: ApiRequestConfig<TBody>,
  ): Promise<ApiResponse<TData>>;
  get<TData = unknown>(
    url: string,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<TData>>;
  post<TData = unknown, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<TData>>;
  put<TData = unknown, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<TData>>;
  patch<TData = unknown, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<TData>>;
  delete<TData = unknown, TBody = unknown>(
    url: string,
    options?: ApiRequestOptions & { body?: TBody },
  ): Promise<ApiResponse<TData>>;
}
