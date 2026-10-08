import 'server-only'

import { ServerApiClient } from '@/lib/api-client/api-client.type'
import { GetProjectsBff, ProjectList } from '../types/project.type'
import { failedResult, successResult } from '@/utils/result'

type Dependencies = {
    apiClient: ServerApiClient
}

export const createGetProjectsBff = (deps: Dependencies): GetProjectsBff => {
    const { apiClient } = deps;

    return async () => {
        const response = await apiClient.get<ProjectList[]>('projects');

        if (!response.ok || !response.data) {
            return failedResult({ code: 'unknown', message: '' })
        }

        return successResult(response.data)
    };
}