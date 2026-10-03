import { Result, ResultError, ResultFailed } from "./result-types";

export const successResult = <TData>(data: TData, message?: string): Result<TData> => ({
    success: true,
    data,
    message,
})

export const failedResult = <TErrorCode>(error: ResultError<TErrorCode>): ResultFailed<TErrorCode> => ({
    success: false,
    error
})