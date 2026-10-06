import type { ApiClient } from "@/shared/services/api-client-types";
import type { ProjectGetListRequest } from "@/projects/types";
import type { ProjectList } from "@/projects/types";

type Dependencies = {
  apiClient: ApiClient;
};

export const createProjectGetListRequest =
  ({ apiClient }: Dependencies): ProjectGetListRequest =>
  () =>
    apiClient.get<ProjectList>("projects");
