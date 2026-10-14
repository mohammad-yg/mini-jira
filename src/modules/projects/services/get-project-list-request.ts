import { ApiClient } from "@/lib/api-client";
import type { ProjectGetListRequest, ProjectListItem } from "../types";

type Dependencies = {
  apiClient: ApiClient;
};

export const createProjectGetListRequest =
  ({ apiClient }: Dependencies): ProjectGetListRequest =>
  () =>
    apiClient.get<ProjectListItem[]>("projects");
