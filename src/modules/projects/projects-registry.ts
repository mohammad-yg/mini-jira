import { baseRegistry, createRegistry } from "@/lib/registry";
import { ProjectGetListRequest } from "./types";
import { createProjectGetListRequest } from "./services";
import { createProjectGetListQuery } from "./queries";
import { ProjectsListQuery } from "./types/project-query.type";

const baseDeps = baseRegistry.instances;

export const projectsRegistry = createRegistry()
  .provide<"projectGetListRequest", ProjectGetListRequest>(
    "projectGetListRequest",
    () => createProjectGetListRequest(baseDeps),
  )
  .provide<"projectGetListQuery", ProjectsListQuery>(
    "projectGetListQuery",
    (deps) =>
      createProjectGetListQuery({
        ...baseDeps,
        getProjectListRequest: deps.projectGetListRequest,
      }),
  )
  .build();
