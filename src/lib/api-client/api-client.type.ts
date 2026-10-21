import { AppCookies } from "@/types/cookies.type";
import type { ApiResponse } from "./api-response.type";

export type ApiHttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiQueryValue = string | number | boolean | null | undefined;

/** Values accepted for URL query parameters. Nullish values are omitted. */
export type ApiQuery = Readonly<
  Record<string, ApiQueryValue | readonly ApiQueryValue[]>
>;

export interface ApiRequestOptions {
  headers?: HeadersInit;
  query?: ApiQuery;
  signal?: AbortSignal;
  credentials?: RequestCredentials;
  baseUrl?: string;
  cookies?: AppCookies;
}

export interface ApiRequestConfig<TBody = unknown> extends ApiRequestOptions {
  method: ApiHttpMethod;
  body?: TBody;
}

/** HTTP client contract. Implementations normalize transport failures to ApiResponse. */
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

export type ClientApiClient = ApiClient;
