import type { ApiClient } from "@/lib/api-client/types";
import type { ProjectGetListRequest, ProjectList } from "../types";

type Dependencies = {
  apiClient: ApiClient;
};

export const createProjectGetListRequest =
  ({ apiClient }: Dependencies): ProjectGetListRequest =>
  () =>
    apiClient.get<ProjectList>("projects");
