import { Result, ResultError, ResultFailed } from "./result.type";

export const successResult = <TData, TErrorCode>(
  data: TData,
  message?: string,
): Result<TData, TErrorCode> => ({
  success: true,
  data,
  message,
});

export const failedResult = <TErrorCode>(
  error: ResultError<TErrorCode>,
): ResultFailed<TErrorCode> => ({
  success: false,
  error,
});
