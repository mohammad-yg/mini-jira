import type { ApiResponse, ApiResponseError } from "./api-response-types";

export const createApiResponse = <TData>(
  data: TData | null,
  error: ApiResponseError | null = null,
  statusCode: number | null = null,
): ApiResponse<TData> => ({
  data,
  error,
  ok: error === null,
  statusCode,
});

export const createSuccessApiResponse = <TData>(
  data: TData,
  statusCode: number | null = null,
): ApiResponse<TData> => createApiResponse(data, null, statusCode);

export const createErrorApiResponse = <TData = never>(
  error: ApiResponseError,
  statusCode: number | null = null,
): ApiResponse<TData> => createApiResponse<TData>(null, error, statusCode);
