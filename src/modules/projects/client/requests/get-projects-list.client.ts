import { ClientApiClient, createErrorApiResponse, createSuccessApiResponse } from "@/lib/api-client";
import { GetProjectsListRequest, ProjectListItem } from "../../types";

interface Dependencies {
    apiClient: ClientApiClient
}

export const createGetProjectsListRequest = (deps: Dependencies): GetProjectsListRequest => {
    const { apiClient } = deps;

    return async () => {
        const response = await apiClient.get<ProjectListItem[]>('/projects');

        if (!response.ok || !response.data) {
            return createErrorApiResponse({
                code: response.error?.code ?? 'unknown',
                message: response.error?.message ?? ''
            });
        }

        return createSuccessApiResponse(response.data)
    }
}