export type ApiResponse<TData> = {
    data: TData | null,
    error: ApiResponseError | null,
    ok: boolean,
    statusCode: number | null;
}

export type ApiResponseError = {
    message: string,
    code: string,
};