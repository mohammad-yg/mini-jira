import { createErrorApiResponse, createSuccessApiResponse } from "../api-client.factory";
import { ApiClient, ApiQuery, ApiRequestConfig, ApiRequestOptions } from "../api-client.type";
import { ApiResponse, ApiResponseError } from "../api-response.type";

const buildUrl = (
    path: string,
    query: ApiQuery | undefined,
    apiBaseUrl: string,
): string => {
    const isAbsolute = /^[a-z][a-z\d+.-]*:\/\//i.test(path);
    const baseUrl = isAbsolute ? undefined : `${apiBaseUrl.replace(/\/+$/, "")}/`;
    const isRelativeBase = Boolean(
        baseUrl && !/^[a-z][a-z\d+.-]*:\/\//i.test(baseUrl),
    );
    const url = new URL(
        isAbsolute ? path : path.replace(/^\/+/, ""),
        isRelativeBase ? new URL(baseUrl!, "http://api-client.local") : baseUrl,
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

    return isRelativeBase
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

const getResponseError = (
    statusCode: number,
    payload: unknown,
): ApiResponseError => {
    if (payload && typeof payload === "object") {
        const body = payload as Record<string, unknown>;
        const nestedError = body.error;

        if (nestedError && typeof nestedError === "object") {
            const error = nestedError as Record<string, unknown>;
            return {
                message:
                    typeof error.message === "string"
                        ? error.message
                        : `Request failed (${statusCode})`,
                code: typeof error.code === "string" ? error.code : String(statusCode),
            };
        }

        return {
            message:
                typeof body.message === "string"
                    ? body.message
                    : typeof body.error === "string"
                        ? body.error
                        : `Request failed (${statusCode})`,
            code: typeof body.code === "string" ? body.code : String(statusCode),
        };
    }

    return {
        message:
            typeof payload === "string" && payload
                ? payload
                : `Request failed (${statusCode})`,
        code: String(statusCode),
    };
};

const createRequest =
    (apiBaseUrl: string, fetcher: typeof fetch, defaultHeaders?: HeadersInit) =>
        async <TData, TBody>(
            path: string,
            config: ApiRequestConfig<TBody>,
        ): Promise<ApiResponse<TData>> => {
            const headers = new Headers(defaultHeaders);
            new Headers(config.headers).forEach((value, key) =>
                headers.set(key, value),
            );
            headers.set("Accept", "application/json");

            const hasBody = config.body !== undefined;
            if (hasBody && !headers.has("Content-Type")) {
                headers.set("Content-Type", "application/json");
            }

            try {
                const response = await fetcher(buildUrl(path, config.query, apiBaseUrl), {
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
                        getResponseError(response.status, payload),
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

/** Builds a browser API client with injectable transport dependencies. */
export const createClientApiClient = ({
    bffApiBaseUrl,
    fetcher,
}: {
    bffApiBaseUrl: string;
    fetcher: typeof fetch;
}): ApiClient => {
    const request = createRequest(bffApiBaseUrl, fetcher);

    const withMethod =
        (method: ApiRequestConfig["method"]) =>
            <TData = unknown, TBody = unknown>(
                url: string,
                body?: TBody,
                options: ApiRequestOptions = {},
            ) =>
                request<TData, TBody>(url, { ...options, method, body });

    return {
        request,
        get: (url, options = {}) => request(url, { ...options, method: "GET" }),
        post: withMethod("POST"),
        put: withMethod("PUT"),
        patch: withMethod("PATCH"),
        delete: (url, options = {}) =>
            request(url, {
                ...options,
                method: "DELETE",
                body: options.body,
            }),
    };
};
