export type Result<TData = unknown, TErrorCode = string> = ResultSuccess<TData> | ResultFailed<TErrorCode>

export interface ResultSuccess<TData> { success: true, data: TData, message?: string };
export interface ResultFailed<TErrorCode> {
    success: false,
    error: ResultError<TErrorCode>,
};


export interface ResultError<TErrorCode> {
    code: TErrorCode,
    message: string
}

export type ResultPromise = Promise<Result>