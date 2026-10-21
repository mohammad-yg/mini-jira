import 'server-only'

import { serverGlobalRegistry } from '@/lib/registry/server'

import { createServerGetProjectsRequest } from './requests'
import { createGetProjectsListQuery, createGetProjectTasksQuery } from '../queries'

export const serverProjectsRegistry = async () => {
    const { apiClient } = await serverGlobalRegistry()

    const getProjectsListRequest = createServerGetProjectsRequest({
        apiClient
    });

    const getProjectsListQuery = createGetProjectsListQuery({
        getProjectsListRequest: getProjectsListRequest
    });

    const getProjectTasksQuery = createGetProjectTasksQuery();


    return {
        getProjectsListRequest,
        getProjectsListQuery,
        getProjectTasksQuery
    }
}