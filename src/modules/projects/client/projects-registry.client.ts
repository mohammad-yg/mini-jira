import 'client-only'

import { createRegistry } from '@/lib/registry'
import { clientGlobalRegistry } from '@/lib/registry/client'

import { createGetProjectsListRequest } from './requests'
import { createGetProjectsListQuery } from '../queries'
import { GetProjectsListRequest, GetProjectsListQuery, GetProjectTasksQuery } from '../types'
import { createGetProjectTasksQuery } from '../queries/get-project-tasks-query'

export const clientProjectsRegistry = createRegistry()
    .provide<'getProjectsListRequest', GetProjectsListRequest>('getProjectsListRequest', () => createGetProjectsListRequest({ apiClient: clientGlobalRegistry.apiClient }))
    .provide<'getProjectsListQuery', GetProjectsListQuery>('getProjectsListQuery', ({ getProjectsListRequest }) => createGetProjectsListQuery({ getProjectsListRequest }))
    .provide<'getProjectTasksQuery',GetProjectTasksQuery>('getProjectTasksQuery',() => createGetProjectTasksQuery())
    .build()
    .instances;