import { baseRegistry, createRegistry } from "@/lib/registry";
import { ProjectGetListQuery, ProjectGetListRequest } from "./types";
import { createProjectGetListRequest } from "./services";
import { createProjectGetListQuery } from "./queries";

const baseDeps = baseRegistry.instances;

export const projectsRegistry =
  createRegistry()
    .provide<'projectGetListRequest', ProjectGetListRequest>('projectGetListRequest', () => createProjectGetListRequest(baseDeps))
    .provide<'projectGetListQuery', ProjectGetListQuery>('projectGetListQuery', (deps) => createProjectGetListQuery({ ...baseDeps, getProjectListRequest: deps.projectGetListRequest }))