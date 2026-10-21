import 'server-only'

import { ServerApiClient } from "@/lib/api-client/server";
import { createErrorApiResponse, createSuccessApiResponse } from "@/lib/api-client";

import { GetProjectsListRequest } from "../../types";

interface Dependencies {
    apiClient: ServerApiClient
}

type ResponseData = Array<{
    id: string;
    name: string;
    key: string;
    description: string;
    ownerId: string;
    memberIds: string[];
}>

export const createServerGetProjectsRequest = (deps: Dependencies):
    GetProjectsListRequest => {
    const { apiClient } = deps;

    return async () => {
        const response = await apiClient.get<ResponseData>('/projects')

        if (!response.ok || !response.data) {
            if (response.ok && !response.data) {
                return createErrorApiResponse({
                    code: 'unknown',
                    message: 'Unexpected empty data in response.'
                });
            }
            if (response.statusCode === 401) {
                return createErrorApiResponse({
                    code: 'unauthorized',
                    message: 'You are not authorized to access projects.'
                });
            }
            if (response.statusCode === 403) {
                return createErrorApiResponse({
                    code: 'forbidden',
                    message: 'Access to projects is forbidden.'
                });
            }
            return createErrorApiResponse({
                code: 'unknown',
                message: response.error?.message ?? 'Failed to fetch projects.',
            }, response.statusCode);
        }

        return createSuccessApiResponse(response.data);
    }
}