import 'server-only'

import { createRegistry } from '@/lib/registry'
import { serverRegistry } from '@/lib/registry/server/registry-instance.server'
import { createGetProjectsBff } from './get-projects-bff.server';
import { GetProjectsBff } from '../types/project.type';

const baseDeps = serverRegistry.instances;

export const serverProjectsRegistry = createRegistry()
    .provide<'getProjectBff', GetProjectsBff>('getProjectBff', () => createGetProjectsBff(baseDeps))
    .build();