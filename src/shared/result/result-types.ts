export type Result<TData = unknown, TErrorCode = string> = ResultSuccess<TData> | ResultFailed<TErrorCode>

export interface ResultSuccess<TData> { success: true, data: TData, message?: string };
export interface ResultFailed<TErrorCode> {
    success: false,
    error: ResultError<TErrorCode>,
};


export interface ResultError<TErrorCode> {
    code: BasicErrorCode | TErrorCode,
    message?: string
}

export type BasicErrorCode =
    | 'unknown'
    | 'validation'
    | 'unauthenticated'
    | 'unauthorized'
    | 'forbidden'
    | 'not_found'
    | 'conflict'
    | 'internal';

export type ResultPromise<TData = unknown, TErrorCode = string> = Promise<Result<TData, TErrorCode>>
